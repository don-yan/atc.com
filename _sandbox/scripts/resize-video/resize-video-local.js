// Import necessary modules
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const async = require('async');


// Specify the local directory path
const directoryPath = '/Users/apple/Desktop/atc-desktop-videos/atc-029/atc-029-video/tmp'; // Replace with your local directory path
// const directoryPath = './tmp'; // Replace with your local directory path

// Should the original file be overwritten?
const replaceFile = false;

// Limit the number of concurrent processes to 2
const concurrencyLimit = 2;


// Function to get video metadata using ffprobe
function getVideoMetadata(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                reject(err);
            } else {
                const videoStream = metadata.streams.find((stream) => stream.codec_type === 'video');
                if (!videoStream) {
                    reject(new Error('No video stream found'));
                } else {

                    console.log(`getVideoMetadata [${filePath}]`, videoStream)

                    resolve({
                        codec: videoStream.codec_name,
                        bitrate: videoStream.bit_rate,
                        width: videoStream.width,
                        height: videoStream.height,
                        // Extract other parameters as needed
                    });
                }
            }
        });
    });
}


// Function to process MP4 files
function processMP4File(task, callback) {
    const {filePath, fileName} = task;


    let tmpDir = './tmp-4';
    let startTime;
    let endTime;

    // tmpDir = path.join(path.dirname(filePath), 'tmp');

    // Ensure tmp directory exists
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }

    const parsed = path.parse(fileName);
    const processedFilePath = path.join(tmpDir, parsed.name + '_compressed' + parsed.ext);


    // Step 1: Get original video metadata
    getVideoMetadata(filePath)
        .then((metadata) => {

            let {codec, bitrate} = metadata;

            // Map codec names to FFMPEG encoder names
            const codecMap = {
                'h264': 'libx264',
                'hevc': 'libx265',
                'mpeg4': 'mpeg4',
                'vp8': 'libvpx',
                'vp9': 'libvpx-vp9',
                // Add more mappings as needed
            };

            // Get the encoder name
            const encoder = codecMap[codec];

            if (!encoder) {
                console.warn(`Unsupported codec '${codec}' for file '${fileName}'. Defaulting to 'libx264'.`);
                codec = 'libx264';
            } else {
                codec = encoder;
            }

            // Convert bitrate to kilobits per second (if not null)
            if (bitrate) {
                bitrate = Math.floor(parseInt(bitrate, 10) / 1000) + 'k';
            } else {
                console.warn(`Bitrate not found for file '${fileName}'. Using default bitrate.`);
                bitrate = '5000k'; // Default to 5000 kbps if bitrate is not available
            }

            // Step 2: Resize the video using FFMPEG with original encoding settings
            ffmpeg(filePath)
                .videoCodec(codec) // Use the mapped encoder

                .videoFilters('scale=-2:1080') // Scale height to 1080p

                /*   // Use libx264 codec for H.264 video
                   .videoCodec('libx264')
                   // Set a target video bitrate (~3.5 Mbps is good for 1080 vertical)
                   .videoBitrate('3500k')
                   // Use AAC for audio and copy sample rate/channels
                   .audioCodec('aac')
                   .audioBitrate('128k')
                   // Set framerate to 30 fps
                   .outputOptions('-r 30')*/
                //
                // // Use a high profile, level 4.1, and ensure proper pixel format for compatibility
                // .outputOptions([
                //     '-profile:v high',
                //     '-level 4.1',
                //     '-pix_fmt yuv420p',
                //     '-c:a aac',
                //     '-strict experimental', // On some older ffmpeg builds, needed for aac
                //     '-loglevel verbose'
                // ])
                // .videoBitrate(bitrate) // Use the original bitrate
                .videoBitrate('3500k')
                .outputOptions('-profile:v', 'high')
                .outputOptions('-threads', '8') // Limit to 8 threads
                // Presets: [ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow]
                .outputOptions('-preset', 'fast') // Optional: Set encoding preset
                .outputOptions('-crf', '24') // Optional: Set encoding preset
                .outputOptions('-c:a copy') // Copy the audio stream without re-encoding
                .outputOptions('-loglevel', 'verbose') // Verbose logging
                .output(processedFilePath)
                .on('start', (commandLine) => {
                    console.log(`Started processing ${fileName}`);
                    console.log('FFMPEG command:', commandLine);
                    startTime = new Date();
                    console.log(`Start time for ${fileName}: ${startTime}`);
                })
                .on('progress', (progress) => {
                    console.log(`Processing ${fileName}: ${progress.percent.toFixed(2)}% done`);
                    if (progress.timemark) {
                        console.log(`Current timestamp for ${fileName}: ${progress.timemark}`);
                    }
                })
                .on('stderr', (stderrLine) => {
                    console.log(`FFMPEG STDERR for ${fileName}:`, stderrLine);
                })
                .on('end', () => {

                    endTime = new Date();
                    console.log(`Finished processing ${fileName}`);
                    console.log(`End time for ${fileName}: ${endTime}`);

                    const totalTimeMs = endTime - startTime;
                    const totalTimeSec = (totalTimeMs / 1000).toFixed(2);
                    console.log(`Total processing time for ${fileName}: ${totalTimeSec} seconds`);
                    if (replaceFile) {
                        console.log('replacing original file', {fileName, processedFilePath})

                        // Replace the original file with the processed file
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(`Error deleting original file ${fileName}:`, err);
                                callback(err);
                                return;
                            }

                            fs.rename(processedFilePath, filePath, (err) => {
                                if (err) {
                                    console.error(`Error renaming processed file ${fileName}:`, err);
                                    callback(err);
                                    return;
                                }

                                console.log(`Processed and replaced file: ${fileName}`);
                                callback();
                            });
                        });
                    } else {
                        callback();
                    }


                })
                .on('error', (err, stdout, stderr) => {
                    console.error(`FFMPEG error: [${fileName}]\n`, err.message);
                    console.error(`FFMPEG stdout: [${fileName}]\n`, stdout);
                    console.error(`FFMPEG stderr: [${fileName}]\n`, stderr);

                    // Even if there's an error, we can log the end time and total time.
                    endTime = new Date();
                    console.log(`Error encountered for ${fileName} at: ${endTime}`);
                    if (startTime) {
                        const totalTimeMs = endTime - startTime;
                        const totalTimeSec = (totalTimeMs / 1000).toFixed(2);
                        console.log(`Total time before error: ${totalTimeSec} seconds`);
                    }

                })
                .run();
        })
        .catch((err) => {
            console.error(`Error getting metadata for file ${fileName}:`, err);
            callback(err);
        });
}

// Read files from the specified local directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    console.log('readDir', directoryPath, files)

    const mp4Files = files.filter((file) => {
        return file.toLowerCase().endsWith('.mp4')
    });

    if (mp4Files.length === 0) {
        console.log('No MP4 files found in the directory.');
        return;
    }

    const queue = async.queue(processMP4File, concurrencyLimit);


    queue.drain = function () {
        console.log('All files have been processed.');
    };

    mp4Files.forEach((fileName) => {
        const filePath = path.join(directoryPath, fileName);
        queue.push({filePath, fileName}, (err) => {
            if (err) {
                console.error(`Error processing file ${fileName}:`, err);
            }
        });
    });
});
