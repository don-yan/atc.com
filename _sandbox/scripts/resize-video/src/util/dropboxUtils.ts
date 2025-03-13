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
    console.log('uploadFile', {localPath, dropboxPath});

    const stats = fs.statSync(localPath);
    const totalSize = stats.size;

    const readStream = fs.createReadStream(localPath);
    const progressLogger = new ProgressLogger(totalSize, path.basename(localPath), 'upload');

    const uploadPromise = dbx.filesUpload({
        path: dropboxPath,
        mode: {'.tag': 'overwrite' as const},
        contents: readStream.pipe(progressLogger),
    });

    const response = await uploadPromise; // Wait for the upload to complete
    return response.result; // Extract and return the FileMetadata
}
