// videoProcessor.ts
import {Dropbox} from 'dropbox';
import * as fs from 'fs';
import * as path from 'path';
import nodeFetch from 'node-fetch';
import async from 'async';
import {processVideo} from './util/ffmpegUtils';
import {closeDropboxReadline, downloadFile, refreshAccessToken, uploadFile} from './util/dropboxUtils';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
    dropboxTempAccessToken: string;
    dropboxRefreshToken?: string; // Optional, will be set if missing
    dropboxFolderPath: string;
    dropboxAppKey: string;
    dropboxAppSecret: string;
    localFolderPath: string;
    localDropboxBaseFolderPath: string;
    concurrencyLimit: number;
    replaceOriginal: boolean;
    useH265: boolean;
    doLocal: boolean;
}

export const appConfig: Config = {
    dropboxTempAccessToken: process.env.DROPBOX_TEMP_ACCESS_TOKEN || '',
    dropboxFolderPath: process.env.DROPBOX_FOLDER_PATH || '',
    dropboxAppKey: process.env.DROPBOX_APP_KEY || '',
    dropboxRefreshToken: process.env.DROPBOX_REFRESH_TOKEN,
    dropboxAppSecret: process.env.DROPBOX_APP_SECRET || '',
    localFolderPath: process.env.LOCAL_FOLDER_PATH || '',
    localDropboxBaseFolderPath: process.env.LOCAL_DROPBOX_BASE_FOLDER_PATH || '',
    concurrencyLimit: parseInt(process.env.CONCURRENCY_LIMIT || '2', 10),
    replaceOriginal: process.env.REPLACE_ORIGINAL === 'true',
    useH265: process.env.USE_H265 === 'true',
    doLocal: process.env.DO_LOCAL === 'true'
};

console.debug(appConfig)

// Custom fetch wrapper to shim .buffer()
export const customFetch = async (...args: Parameters<typeof nodeFetch>) => {
    const response = await nodeFetch(...args);
    if (!('buffer' in response)) {
        (response as any).buffer = async () => Buffer.from(await response.arrayBuffer());
    }
    return response;
};

interface FileTask {
    filePath: string;
    fileName: string;
    path_display: string;
}

async function processLocalFiles(): Promise<void> {
    const mp4Files = fs.readdirSync(appConfig.localFolderPath)
        .filter(file => file.toLowerCase().endsWith('.mp4'))
        .map(file => ({
            filePath: path.join(appConfig.localFolderPath, file),
            fileName: file
        } as FileTask));

    if (!mp4Files.length) {
        console.log('No MP4 files found in the local directory.');
        return;
    }

    const queue = async.queue<FileTask>(async (task, callback) => {
        const outputPath = path.join(path.dirname(task.filePath), 'tmp', `${path.parse(task.fileName).name}_compressed.mp4`);
        try {
            await processVideo({
                inputPath: task.filePath,
                outputPath,
                replaceOriginal: appConfig.replaceOriginal,
                useH265: appConfig.useH265
            });
            callback();
        } catch (error) {
            console.error(`Error processing ${task.fileName}:`, error);
            callback(error as Error);
        }
    }, appConfig.concurrencyLimit);

    queue.drain(() => console.log('All local files have been processed.'));
    queue.push(mp4Files, (err, task) => {
        if (err) console.error(`Error processing file ${task?.name || 'unknown'}:`, err);
    });
}

async function processDropboxFiles(): Promise<void> {

    // TODO: change to use refresh token...
     let accessToken = await refreshAccessToken();
     let dbx = new Dropbox({ accessToken, fetch: customFetch });


    // Initialize Dropbox client
    // const dbx = new Dropbox({accessToken: appConfig.dropboxTempAccessToken, fetch: customFetch});

    const {result} = await dbx.filesListFolder({path: appConfig.dropboxFolderPath, recursive: false});
    const mp4Files = result.entries.filter(
        entry => entry['.tag'] === 'file' && entry.name.toLowerCase().endsWith('.mp4')
    );

    if (!mp4Files.length) {
        console.log('No MP4 files found in the Dropbox folder.');
        return;
    }

    console.log(mp4Files)

    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const queue = async.queue(async (file: any, callback) => {
        try {
            const localPath = await downloadFile(accessToken, file);
            const processedPath = path.join(tmpDir, `processed_${file.name}`);

            console.log('localPath', localPath)

            await processVideo({
                inputPath: localPath,
                outputPath: processedPath,
                useH265: appConfig.useH265
            });

            await uploadFile(dbx, processedPath, file.path_display);
            console.log(`Processed and replaced Dropbox file: ${file.name}`);

             fs.unlinkSync(localPath);
            // fs.unlinkSync(processedPath);
            callback();
        } catch (error) {
            console.error(`error processing file: [${file.name}]`, error)
            callback(error as Error);
        }
    }, appConfig.concurrencyLimit);

    queue.drain(() => {
        console.log('All Dropbox files have been processed.')
        closeDropboxReadline();
    });
    queue.push(mp4Files, (err, task) => {
        if (err) console.error(`Error processing Dropbox file ${task?.name || 'unknown'}:`, err);
    });
}

async function main(): Promise<void> {
    try {
        if (appConfig.doLocal) {
            await processLocalFiles();
        } else {
            await processDropboxFiles();
        }
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

main().catch(console.error);
