// Import necessary modules
const { Dropbox } = require('dropbox');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const fetch = require('node-fetch'); // Required for Dropbox SDK
const path = require('path');

// Initialize Dropbox client
const dbx = new Dropbox({ accessToken: 'YOUR_ACCESS_TOKEN', fetch: fetch });

// Specify the Dropbox folder path
const folderPath = '/path/to/your/folder'; // Replace with your Dropbox folder path

// Function to process MP4 files
function processMP4File(file) {
  const localDir = './tmp';

  // Ensure tmp directory exists
  if (!fs.existsSync(localDir)) {
    fs.mkdirSync(localDir);
  }

  const localFilePath = path.join(localDir, file.name);
  const processedFilePath = path.join(localDir, 'processed_' + file.name);

  // Step 1: Download the file from Dropbox
  dbx
    .filesDownload({ path: file.path_lower })
    .then(({ result }) => {
      fs.writeFileSync(localFilePath, result.fileBinary, 'binary');

      // Step 2: Resize the video using FFMPEG
      ffmpeg(localFilePath)
        .videoFilters('scale=-2:1080') // Scale height to 1080p, width adjusted to maintain aspect ratio
        .outputOptions('-c:a copy') // Copy the audio stream without re-encoding
        .output(processedFilePath)
        .on('end', () => {
          // Step 3: Upload the resized video back to Dropbox, overwriting the original
          fs.readFile(processedFilePath, (err, contents) => {
            if (err) {
              console.error('Error reading processed file:', err);
              return;
            }

            dbx
              .filesUpload({
                path: file.path_lower,
                mode: { '.tag': 'overwrite' },
                contents: contents,
              })
              .then(() => {
                console.log(`Processed and replaced file: ${file.name}`);

                // Step 4: Clean up temporary files
                fs.unlinkSync(localFilePath);
                fs.unlinkSync(processedFilePath);
              })
              .catch((error) => {
                console.error('Error uploading file:', error);
              });
          });
        })
        .on('error', (err) => {
          console.error('FFMPEG error:', err);
        })
        .run();
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
}

// List files in the specified Dropbox folder
dbx
  .filesListFolder({ path: folderPath })
  .then(({ result }) => {
    const mp4Files = result.entries.filter(
      (entry) => entry['.tag'] === 'file' && entry.name.endsWith('.mp4')
    );

    if (mp4Files.length === 0) {
      console.log('No MP4 files found in the folder.');
      return;
    }

    // Process each MP4 file
    mp4Files.forEach((file) => {
      processMP4File(file);
    });
  })
  .catch((error) => {
    console.error('Error listing folder:', error);
  });
