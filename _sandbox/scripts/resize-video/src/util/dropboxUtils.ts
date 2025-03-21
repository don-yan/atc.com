// dropboxUtils.ts
import {Dropbox, files} from 'dropbox';
import * as fs from 'fs';
import * as path from 'path';
import {pipeline} from 'stream/promises';
import {Transform, Readable} from 'stream';
import {appConfig, customFetch} from '../videoProcessor';
import * as readline from 'readline';
import {progressManager} from './progressManager';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface DropboxFile extends files.FileMetadata {
    path_lower: string;
    path_display: string;
    name: string;
}

// Custom Transform stream to log progress
class ProgressLogger extends Transform {
    private totalBytes: number;
    private bytesTransferred: number = 0;
    private fileId: string;

    private startTime: Date;
    private firstWrite: boolean = true;
    private operation: string;
    private fileName: string;
    private lastLoggedPercent: number = -1;

    constructor(totalBytes: number, fileName: string, operation: 'download' | 'upload') {
        super();
        this.totalBytes = totalBytes;
        this.bytesTransferred = 0;
        this.operation = operation;
        this.fileName = fileName;
        this.startTime = new Date();
        this.fileId = `${operation}-${fileName}`; // Unique ID per file and operation
        progressManager.register(this.fileId, `${operation} started for ${fileName}, total size: ${this.totalBytes} bytes`);
    }

    _final(callback: (error?: Error | null) => void) {
        const elapsedTime = ((new Date().getTime() - this.startTime.getTime()) / 1000).toFixed(2); // Seconds
        const message = `[${this.operation} ${path.basename(this.fileName)}] Completed: 100% (${this.totalBytes}/${this.totalBytes} bytes) Duration: ${elapsedTime}s`;
        // process.stdout.write(`\r${message.padEnd(80)}\n`); // Final update, move to new line
        progressManager.update(this.fileId, message);
        setTimeout(() => progressManager.unregister(this.fileId), 1000); // Delay removal for visibility
        callback();
    }

    _transform(chunk: Buffer, encoding: string, callback: (error?: Error | null, data?: Buffer) => void) {
        this.bytesTransferred += chunk.length;
        const percent = Math.floor((this.bytesTransferred / this.totalBytes) * 100);
        if (percent > this.lastLoggedPercent) {
            const elapsedTime = ((new Date().getTime() - this.startTime.getTime()) / 1000).toFixed(2);
            const message = `[${this.operation} ${path.basename(this.fileName)}] Progress: ${percent.toFixed(2)}% (${this.bytesTransferred}/${this.totalBytes} bytes) Duration: ${elapsedTime}s`;
            /*if (this.firstWrite) {
                process.stdout.write(`${message}\n`); // Start on a new line
                this.firstWrite = false;
            } else {
                process.stdout.write(`\r${message.padEnd(80)}`); // Update in place
            }*/
            progressManager.update(this.fileId, message);
            this.lastLoggedPercent = percent;
        }
        callback(null, chunk);
    }
}

export async function getRefreshToken(): Promise<string> {
    if (!appConfig.dropboxAppKey || !appConfig.dropboxAppSecret) {
        throw new Error('DROPBOX_APP_KEY and DROPBOX_APP_SECRET must be set in .env');
    }

    // Step 1: Prompt user to authorize the app
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${appConfig.dropboxAppKey}&response_type=code&token_access_type=offline`;
    console.log(`Please visit this URL to authorize the app: ${authUrl}`);
    console.log('After authorizing, you’ll get an authorization code. Paste it here.');

    const authCode = await new Promise<string>((resolve) => {
        rl.question('Enter the authorization code: ', (code) => resolve(code.trim()));
    });

    // Step 2: Exchange code for refresh token
    const response = await customFetch('https://api.dropboxapi.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${appConfig.dropboxAppKey}:${appConfig.dropboxAppSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${authCode}`
    });


    if (!response.ok) {
        throw new Error(`Failed to exchange code for token: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(data)
    const refreshToken = data.refresh_token;
    if (!refreshToken) {
        throw new Error('No refresh token received from Dropbox');
    }

    // Step 3: Save refresh token to .env

    const envPath = path.resolve(process.cwd(), '.env');
    console.log({envPath})
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const refreshTokenLine = `DROPBOX_REFRESH_TOKEN=${refreshToken}\n`;
    if (envContent.includes('DROPBOX_REFRESH_TOKEN=')) {
        envContent = envContent.replace(/DROPBOX_REFRESH_TOKEN=.*/g, refreshTokenLine.trim());
    } else {
        envContent += refreshTokenLine;
    }
    fs.writeFileSync(envPath, envContent);
    console.log(`Refresh token saved to .env: ${refreshToken}`);

    return refreshToken;
}

export function closeDropboxReadline() {
    rl.close();
}

export async function refreshAccessToken(): Promise<string> {
    let refreshToken = appConfig.dropboxRefreshToken;
    if (!refreshToken) {
        refreshToken = await getRefreshToken();
        appConfig.dropboxRefreshToken = refreshToken;
    }

    const response = await customFetch('https://api.dropboxapi.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${appConfig.dropboxAppKey}:${appConfig.dropboxAppSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    });

    if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

export async function downloadFile(accessToken: string, file: DropboxFile): Promise<string> {
    const localPath = path.join('./tmp', file.name);
    const totalSize = file.size;

    console.log('downloadFile', {localPath, totalSize});

    // Use the raw Dropbox API endpoint for streaming
    const url = 'https://content.dropboxapi.com/2/files/download';
    const headers = {
        // 'Authorization': `Bearer ${appConfig.dropboxTempAccessToken}`,
        'Authorization': `Bearer ${accessToken}`,
        'Dropbox-API-Arg': JSON.stringify({path: file.path_lower}),
    };

    const response = await customFetch(url, {method: 'POST', headers});
    if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
    }

    // Convert the ReadableStream to a Node.js Readable
    const nodeStream = Readable.from(response.body as any); // TypeScript workaround
    const writeStream = fs.createWriteStream(localPath, {flags: 'w', encoding: 'binary'});
    const progressLogger = new ProgressLogger(totalSize, file.name, 'download');

    await pipeline(nodeStream, progressLogger, writeStream);
    return localPath;
}

export async function uploadFile(dbx: Dropbox, localPath: string, dropboxPath: string): Promise<files.FileMetadata> {


    const stats = fs.statSync(localPath);
    const totalSize = stats.size;
    const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MB chunks
    const MAX_SINGLE_UPLOAD_SIZE = 150 * 1024 * 1024; // 150 MB

    console.log('uploadFile', {localPath, dropboxPath, stats});

    const readStream = fs.createReadStream(localPath);
    const progressLogger = new ProgressLogger(totalSize, localPath, 'upload');

    if (totalSize <= MAX_SINGLE_UPLOAD_SIZE) {
        // Single upload for small files
        const uploadPromise = dbx.filesUpload({
            path: dropboxPath,
            mode: {'.tag': 'overwrite' as const},
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
                mode: {'.tag': 'overwrite' as const},
            },
        });

        progressLogger.end(); // Ensure final progress log
        return finishResponse.result;
    }
}
