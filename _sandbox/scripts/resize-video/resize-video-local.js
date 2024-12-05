// Import necessary modules
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const async = require('async');


// Specify the local directory path
// const directoryPath = '/Users/apple/Desktop/atc-desktop-videos/atc-027/video/atc-027-video/tmp'; // Replace with your local directory path
const directoryPath = './tmp'; // Replace with your local directory path

// Should the original file be overwritten?
const replaceFile = false;

// Limit the number of concurrent processes to 2
const concurrencyLimit = 1;


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

    // tmpDir = path.join(path.dirname(filePath), 'tmp');

    // Ensure tmp directory exists
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }

    const processedFilePath = path.join(tmpDir, fileName + '_compressed');

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
                // .videoBitrate(bitrate) // Use the original bitrate
                .videoFilters('scale=-2:1080') // Scale height to 1080p

                .outputOptions('-preset', 'medium') // Optional: Set encoding preset
                .outputOptions('-crf', '24') // Optional: Set encoding preset
                .outputOptions('-c:a copy') // Copy the audio stream without re-encoding
                .outputOptions('-loglevel', 'verbose') // Verbose logging
                .output(processedFilePath)
                .on('start', (commandLine) => {
                    console.log(`Started processing ${fileName}`);
                    console.log('FFMPEG command:', commandLine);
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


                    console.log('processMP4File | [end]', fileName);
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
