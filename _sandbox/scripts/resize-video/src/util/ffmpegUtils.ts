// ffmpegUtils.ts
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import {progressManager} from './progressManager';

interface VideoMetadata {
    codec: string;
    bitrate: string | undefined;
    width: number;
    height: number;
}

interface ProcessVideoOptions {
    inputPath: string;
    outputPath: string;
    replaceOriginal?: boolean;
    useH265?: boolean;
}

export function getVideoMetadata(filePath: string): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                reject(err);
                return;
            }
            const videoStream = metadata.streams.find((stream) => stream.codec_type === 'video');
            if (!videoStream) {
                reject(new Error('No video stream found'));
                return;
            }
            resolve({
                codec: videoStream.codec_name,
                bitrate: videoStream.bit_rate,
                width: videoStream.width,
                height: videoStream.height,
            });
        });
    });
}

export async function processVideo({
                                       inputPath,
                                       outputPath,
                                       replaceOriginal = false,
                                       useH265 = false
                                   }: ProcessVideoOptions): Promise<void> {
    let startTime: Date;
    // const fileId = `process-${path.basename(inputPath)}`;
    let firstProgress = true;

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {recursive: true});
    }

    console.log('processVideo', {inputPath, outputPath});
    const metadata = await getVideoMetadata(inputPath);
    const codecMap: { [key: string]: string } = {
        'h264': 'libx264',
        'hevc': 'libx265',
        'mpeg4': 'mpeg4',
        'vp8': 'libvpx',
        'vp9': 'libvpx-vp9',
    };

    const codec = useH265 ? 'libx265' : codecMap[metadata.codec] || 'libx264';
    const originalBitrateKbps = metadata.bitrate && !isNaN(parseInt(metadata.bitrate, 10))
        ? Math.floor(parseInt(metadata.bitrate, 10) / 1000)
        : 5000;
    const scaledBitrateKbps = Math.max(3000, Math.min(8000, Math.floor(originalBitrateKbps / 4))); // Scale for 1080p
    const bitrate = `${scaledBitrateKbps}k`;

    console.log({bitrate, useH265, metadata})
    return new Promise((resolve, reject) => {
        let ffmpegCommand = ffmpeg(inputPath)
            .videoCodec(codec)
            // .videoBitrate(bitrate) // NOTE: bitrate will be resolved to match CRF
            .videoFilters('scale=-2:1080')
            .outputOptions(['-map 0:v:0', '-map 0:a:0']) // Map only video and audio streams
            // .outputOptions('-map 0') // Map all streams from input
            .format('mp4'); // Explicitly set MP4 container


        if (useH265) {
            ffmpegCommand.outputOptions([
                '-profile:v main', // H.265 uses 'main' instead of 'high'
                '-threads 8',
                '-preset medium',
                '-crf 22', // Slightly higher CRF due to H.265 efficiency
                // '-c:a copy',
                '-c:a aac', // Re-encode audio to AAC
                '-b:a 128k', // 128 kbps audio bitrate
                '-loglevel verbose'
            ])
        } else {
            ffmpegCommand.outputOptions([
                '-profile:v high',
                '-threads 8',
                '-preset medium', // Better compression
                '-crf 20', // Higher quality
                '-c:a copy',
                '-loglevel verbose'
            ])
        }
        ffmpegCommand.output(outputPath)
            .on('start', (commandLine) => {
                console.log(`Started processing ${path.basename(inputPath)}`);
                console.log('FFMPEG command:', commandLine);
                startTime = new Date();
                // progressManager.register(fileId, `Processing ${path.basename(inputPath)}: 0.00% done`);
            })
            .on('progress', (progress) => {
                const message = `[process ${path.basename(inputPath)}] Progress: ${progress.percent.toFixed(2)}% done`;
                if (firstProgress) {
                    process.stdout.write(`${message}\n`);
                    firstProgress = false;
                } else {
                    process.stdout.write(`\r${message.padEnd(80)}`);
                }
                // progressManager.update(fileId, message);
            })
            .on('end', () => {
                const endTime = new Date();
                const totalTimeSec = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);
                const message = `Finished processing ${path.basename(inputPath)} in ${totalTimeSec} seconds`;
                // progressManager.update(fileId, message);
                // setTimeout(() => progressManager.unregister(fileId), 1000); // Delay removal
                  process.stdout.write(`\r${message.padEnd(80)}\n`);
                if (replaceOriginal) {
                    fs.unlinkSync(inputPath);
                    fs.renameSync(outputPath, inputPath);
                }
                resolve();
            })
            .on('error', (err, stdout, stderr) => {
                console.error(`FFMPEG error: [${path.basename(inputPath)}]\n`, err.message);
                // progressManager.unregister(fileId);
                reject(err);
            });

        ffmpegCommand.run();
    });
}
