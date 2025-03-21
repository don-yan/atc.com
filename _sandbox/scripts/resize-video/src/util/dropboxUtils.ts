// dropboxUtils.ts
import {Dropbox, files} from 'dropbox';
import * as fs from 'fs';
import * as path from 'path';
import { pipeline } from 'stream/promises';
import { Transform, Readable } from 'stream';
import {appConfig, customFetch} from '../videoProcessor'; // Import customFetch

interface DropboxFile extends files.FileMetadata {
    path_lower: string;
    name: string;
}

// Custom Transform stream to log progress
class ProgressLogger extends Transform {
    private totalBytes: number;
    private bytesTransferred: number = 0;

    constructor(totalBytes: number, fileName: string, operation: 'download' | 'upload') {
        super();
        this.totalBytes = totalBytes;
        this.bytesTransferred = 0;
        process.stdout.write(`${operation} started for ${fileName}, total size: ${this.totalBytes} bytes\n`);
    }

    _transform(chunk: Buffer, encoding: string, callback: (error?: Error | null, data?: Buffer) => void) {
        this.bytesTransferred += chunk.length;
        const percent = ((this.bytesTransferred / this.totalBytes) * 100).toFixed(2);
        const message = `Progress: ${percent}% (${this.bytesTransferred}/${this.totalBytes} bytes)`;
        process.stdout.write(`\r${message.padEnd(60)}`); // Overwrite line, pad to clear previous output
        callback(null, chunk);
    }

    _final(callback: (error?: Error | null) => void) {
        const message = `Completed: 100% (${this.totalBytes}/${this.totalBytes} bytes)`;
        process.stdout.write(`\r${message}\n`); // Move to new line on completion
        callback();
    }
}

export async function downloadFile(dbx: Dropbox, file: DropboxFile): Promise<string> {
    const localPath = path.join('./tmp', file.name);
    const totalSize = file.size;

    console.log('downloadFile', { localPath, totalSize });

    // Use the raw Dropbox API endpoint for streaming
    const url = 'https://content.dropboxapi.com/2/files/download';
    const headers = {
        'Authorization': `Bearer ${appConfig.dropboxToken}`,
        'Dropbox-API-Arg': JSON.stringify({ path: file.path_lower }),
    };

    const response = await customFetch(url, { method: 'POST', headers });
    if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
    }

    // Convert the ReadableStream to a Node.js Readable
    const nodeStream = Readable.from(response.body as any); // TypeScript workaround
    const writeStream = fs.createWriteStream(localPath, { flags: 'w', encoding: 'binary' });
    const progressLogger = new ProgressLogger(totalSize, file.name, 'download');

    await pipeline(nodeStream, progressLogger, writeStream);
    return localPath;
}

export async function uploadFile(dbx: Dropbox, localPath: string, dropboxPath: string): Promise<files.FileMetadata> {


    const stats = fs.statSync(localPath);
    const totalSize = stats.size;
    const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MB chunks
    const MAX_SINGLE_UPLOAD_SIZE = 150 * 1024 * 1024; // 150 MB

    console.log('uploadFile', {localPath, dropboxPath,stats});

    const readStream = fs.createReadStream(localPath);
    const progressLogger = new ProgressLogger(totalSize, path.basename(localPath), 'upload');

    if (totalSize <= MAX_SINGLE_UPLOAD_SIZE) {
        // Single upload for small files
    const uploadPromise = dbx.filesUpload({
        path: dropboxPath,
            mode: { '.tag': 'overwrite' as const },
        contents: readStream.pipe(progressLogger),
    });
        const response = await uploadPromise;
        return response.result;
    } else {
        // Chunked upload for large files
        let sessionId: string;
        let offset = 0;
        const chunks: Buffer[] = [];

        // Read file into chunks
        for await (const chunk of readStream) {
            chunks.push(chunk);
            progressLogger.write(chunk); // Manually push chunks through progress logger

            if (chunks.reduce((sum, c) => sum + c.length, 0) >= CHUNK_SIZE || offset + chunk.length === totalSize) {
                const chunkBuffer = Buffer.concat(chunks);
                if (!sessionId) {
                    // Start the upload session
                    const startResponse = await dbx.filesUploadSessionStart({
                        close: false,
                        contents: chunkBuffer,
                    });
                    sessionId = startResponse.result.session_id;
                } else {
                    // Append to the session
                    await dbx.filesUploadSessionAppendV2({
                        cursor: {
                            session_id: sessionId,
                            offset: offset,
                        },
                        close: false,
                        contents: chunkBuffer,
                    });
                }
                offset += chunkBuffer.length;
                chunks.length = 0; // Clear chunks
            }
}

        // Finish the session
        const finishResponse = await dbx.filesUploadSessionFinish({
            cursor: {
                session_id: sessionId!,
                offset: offset,
            },
            commit: {
                path: dropboxPath,
                mode: { '.tag': 'overwrite' as const },
            },
        });

        progressLogger.end(); // Ensure final progress log
        return finishResponse.result;
    }
}
