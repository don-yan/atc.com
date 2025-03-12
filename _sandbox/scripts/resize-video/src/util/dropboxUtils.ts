// dropboxUtils.ts
import {Dropbox, files} from 'dropbox';
import * as fs from 'fs';
import * as path from 'path';
import {pipeline} from 'stream/promises';
import {Transform} from 'stream';

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
        console.log(`${operation} started for ${fileName}, total size: ${this.totalBytes} bytes`);
    }

    _transform(chunk: Buffer, encoding: string, callback: (error?: Error | null, data?: Buffer) => void) {
        this.bytesTransferred += chunk.length;
        const percent = ((this.bytesTransferred / this.totalBytes) * 100).toFixed(2);
        console.log(`Progress: ${percent}% (${this.bytesTransferred}/${this.totalBytes} bytes)`);
        callback(null, chunk);
    }

    _final(callback: (error?: Error | null) => void) {
        console.log(`Completed: 100% (${this.totalBytes}/${this.totalBytes} bytes)`);
        callback();
    }
}

export async function downloadFile(dbx: Dropbox, file: DropboxFile): Promise<string> {
    const localPath = path.join('./tmp', file.name);


    // Get the file size from metadata
    const totalSize = file.size;

    console.log('downloadFile', {localPath, totalSize});

    // Perform the download with streaming
    const response = await dbx.filesDownload({path: file.path_lower});
    const fileBinary = (response.result as any).fileBinary;

    const writeStream = fs.createWriteStream(localPath, {flags: 'w', encoding: 'binary'});
    const bufferStream = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk);
        }
    });
    bufferStream.end(fileBinary);

    const progressLogger = new ProgressLogger(totalSize, file.name, 'download');

    // Pipe the streams with progress logging
    await pipeline(bufferStream, progressLogger, writeStream);
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
