// videoProcessor.ts
import {Dropbox} from 'dropbox';
import * as fs from 'fs';
import * as path from 'path';
import nodeFetch from 'node-fetch';
import async from 'async';
import {processVideo} from './util/ffmpegUtils';
import {downloadFile, uploadFile} from './util/dropboxUtils';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
    dropboxToken: string;
    dropboxFolderPath: string;
    localFolderPath: string;
    concurrencyLimit: number;
    replaceOriginal: boolean;
    useH265: boolean;
}

export const appConfig: Config = {
    dropboxToken: process.env.DROPBOX_TOKEN || '',
    dropboxFolderPath: process.env.DROPBOX_FOLDER_PATH || '',
    localFolderPath: process.env.LOCAL_FOLDER_PATH || '',
    concurrencyLimit: parseInt(process.env.CONCURRENCY_LIMIT || '2', 10),
    replaceOriginal: process.env.REPLACE_ORIGINAL === 'true',
    useH265: process.env.USE_H265 === 'true'
};

console.log(appConfig)

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

    // Initialize Dropbox client
    const dbx = new Dropbox({accessToken: appConfig.dropboxToken, fetch: customFetch});

    const {result} = await dbx.filesListFolder({path: appConfig.dropboxFolderPath,recursive:false});
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
            const localPath = await downloadFile(dbx, file);
            const processedPath = path.join(tmpDir, `processed_${file.name}`);

            console.log('localPath', localPath)

            await processVideo({
                inputPath: localPath,
                outputPath: processedPath,
                useH265: appConfig.useH265
            });

            await uploadFile(dbx, processedPath, file.path_display);
            console.log(`Processed and replaced Dropbox file: ${file.name}`);

            // fs.unlinkSync(localPath);
            // fs.unlinkSync(processedPath);
            callback();
        } catch (error) {
            console.error(`error processing file: [${file.name}]`, error)
            callback(error as Error);
        }
    }, appConfig.concurrencyLimit);

    queue.drain(() => console.log('All Dropbox files have been processed.'));
  queue.push(mp4Files, (err, task) => {
        if (err) console.error(`Error processing Dropbox file ${task?.name || 'unknown'}:`, err);
    });
}

async function main(): Promise<void> {
    try {
        await processLocalFiles();
        // await processDropboxFiles();
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

main().catch(console.error);
