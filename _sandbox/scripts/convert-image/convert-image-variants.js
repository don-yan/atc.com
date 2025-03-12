const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

/**
 * ======
 * Generate image variants based on specified config
 *
 node convert-image-variants.js --workDir=./img/atc-025 --output=output --outputItems='[
 {"aspectRatio": "9:16", "backgroundType": "gradient"},
 {"aspectRatio": "16:9", "backgroundType": "black"},
 {"aspectRatio": "4:3", "backgroundType": "gradient"},
 {"aspectRatio": "1:1", "backgroundType": "black"}
 ]'
 *
 *
 * ======
 */

// Get command-line arguments
const args = process.argv.slice(2);

// Default values
let inputPath = null; // Single input file path
let atcShowId = 'atc-033'
let workDir = `img/${atcShowId}`; // Directory containing multiple image files
let outputBaseName = 'output'; // Base name for output files
let outputItems = [
    {aspectRatio: '9:16', backgroundType: 'gradient'},
    {aspectRatio: '9:16', backgroundType: 'black'},
    {aspectRatio: '16:9', backgroundType: 'gradient'},
    {aspectRatio: '12:9', backgroundType: 'gradient'},
    {aspectRatio: '12:9', backgroundType: 'black'},
    {aspectRatio: '16:9', backgroundType: 'black'},
    {aspectRatio: '3:2', backgroundType: 'black'},
    {aspectRatio: '3:2', backgroundType: 'gradient'},
    {aspectRatio: '2:1', backgroundType: 'gradient'},
    {aspectRatio: '7:5', backgroundType: 'black'},
    {aspectRatio: '7:5', backgroundType: 'gradient'},
    {aspectRatio: '50:27', backgroundType: 'black'},
    {aspectRatio: '50:27', backgroundType: 'gradient'},
    {aspectRatio: '4:5', backgroundType: 'black'},
    {aspectRatio: '4:5', backgroundType: 'gradient'},
    {aspectRatio: '1920:1005', backgroundType: 'gradient'},
    {aspectRatio: '1:1', backgroundType: 'black', maxWidth: 2000},
    {exactWidth: 1920, exactHeight: 915, backgroundType: 'gradient'},
    // {exactWidth: 1920, exactHeight: 1005, backgroundType: 'gradient'},
    // {exactWidth: 1920, exactHeight: 915, backgroundType: 'black'},
    // {exactWidth: 1200, exactHeight: 628, backgroundType: 'gradient'},
    // {exactWidth: 1200, exactHeight: 628, backgroundType: 'black'},
    // 1200x628
]; // Default aspect ratios with background types

// Parse command-line arguments
args.forEach((arg) => {
    if (arg.startsWith('--input=')) {
        inputPath = arg.split('=')[1];
    } else if (arg.startsWith('--workDir=')) {
        workDir = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
        outputBaseName = arg.split('=')[1];
    } else if (arg.startsWith('--outputItems=')) {
        // Parse the JSON array
        const aspectsArg = arg.split('=')[1];
        try {
            outputItems = JSON.parse(aspectsArg);
        } catch (err) {
            console.error('Error parsing aspect ratios JSON:', err.message);
            process.exit(1);
        }
    }
});

(async () => {
    try {
        // Validate input
        if (!inputPath && !workDir) {
            console.error('Please provide either --input= or --workDir= argument.');
            process.exit(1);
        }
        if (inputPath && workDir) {
            console.error('Please provide only one of --input= or --workDir= arguments, not both.');
            process.exit(1);
        }

        // Function to process a single image file
        async function processImageFile(imagePath) {
            try {
                // Read input image
                const inputImage = sharp(imagePath);

                // Get metadata to find dimensions
                const metadata = await inputImage.metadata();
                const inputWidth = metadata.width;
                const inputHeight = metadata.height;

                // Clone the original image for further operations
                const originalImage = inputImage.clone();

                // Extract base name of input file without extension
                const inputBaseName = path.basename(imagePath, path.extname(imagePath));

                // Process each aspect ratio
                const tasks = outputItems.map(async (item) => {
                    try {
                        const aspectRatio = item.aspectRatio;
                        const backgroundType = item.backgroundType || 'gradient'; // Default to 'gradient' if not specified

                        const maxWidth = item.maxWidth ? parseInt(item.maxWidth, 10) : null;
                        const maxHeight = item.maxHeight ? parseInt(item.maxHeight, 10) : null;
                        const exactWidth = item.exactWidth ? parseInt(item.exactWidth, 10) : null;
                        const exactHeight = item.exactHeight ? parseInt(item.exactHeight, 10) : null;

                        // Validate numeric inputs
                        if (item.maxWidth && isNaN(maxWidth)) {
                            throw new Error(`Invalid maxWidth "${item.maxWidth}" for aspect ratio ${aspectRatio}.`);
                        }
                        if (item.maxHeight && isNaN(maxHeight)) {
                            throw new Error(`Invalid maxHeight "${item.maxHeight}" for aspect ratio ${aspectRatio}.`);
                        }
                        if (item.exactWidth && isNaN(exactWidth)) {
                            throw new Error(`Invalid exactWidth "${item.exactWidth}" for aspect ratio ${aspectRatio}.`);
                        }
                        if (item.exactHeight && isNaN(exactHeight)) {
                            throw new Error(`Invalid exactHeight "${item.exactHeight}" for aspect ratio ${aspectRatio}.`);
                        }

                        let outputWidth, outputHeight;
                        let useExactDimensions = false;

                        if (exactWidth && exactHeight) {
                            // If exact dimensions are provided, use them directly
                            outputWidth = exactWidth;
                            outputHeight = exactHeight;
                            useExactDimensions = true;
                        } else {
                            // Otherwise, use aspect ratio logic
                            const [aspectW, aspectH] = aspectRatio.split(':').map(Number);
                            const isSquare = aspectH === aspectW;
                            if (!aspectW || !aspectH) {
                                throw new Error(`Invalid aspect ratio format: ${aspectRatio}. Use "width:height", e.g., "16:9" or "9:16".`);
                            }

                            if (aspectW >= aspectH) {
                                // Landscape orientation
                                outputHeight = inputHeight;
                                outputWidth = Math.round((outputHeight * aspectW) / aspectH);
                            } else {
                                // Portrait orientation
                                outputWidth = inputWidth;
                                outputHeight = Math.round((outputWidth * aspectH) / aspectW);
                            }

                            // Apply maxWidth and maxHeight if provided (only if we are using aspect ratio)
                            if (maxWidth && outputWidth > maxWidth) {
                                const scaleFactor = maxWidth / outputWidth;
                                outputWidth = maxWidth;
                                outputHeight = Math.round(outputHeight * scaleFactor);
                            }
                            if (maxHeight && outputHeight > maxHeight) {
                                const scaleFactor = maxHeight / outputHeight;
                                outputHeight = maxHeight;
                                outputWidth = Math.round(outputWidth * scaleFactor);
                            }
                        }

                        console.log('item settings', {
                            aspectRatio,
                            exactWidth,
                            exactHeight,
                            maxWidth,
                            maxHeight,
                            outputWidth,
                            outputHeight
                        })

                        // Determine if the output image is portrait
                        // If exactWidth and exactHeight given, determine orientation from those
                        // Otherwise, from aspect ratio
                        let isPortraitImage;
                        if (exactWidth && exactHeight) {
                            isPortraitImage = exactHeight > exactWidth;
                        } else {
                            const [aspectW, aspectH] = aspectRatio.split(':').map(Number);
                            isPortraitImage = aspectH > aspectW;
                        }

                        // Create background based on the specified type
                        let backgroundBuffer;
                        if (backgroundType === 'gradient') {
                            // Determine slice size (at least 1 pixel, up to 10% of the image dimension)
                            const sliceSize = Math.max(1, Math.floor((isPortraitImage ? inputHeight : inputWidth) * 0.015));

                            // Extract slices to get average colors
                            const channels = metadata.channels;
                            const paddingX = 20; //0

                            const startSliceBuffer = await originalImage.clone()
                                .extract({
                                    left: paddingX,
                                    top: 0,
                                    width: inputWidth - (paddingX * 2),
                                    height: sliceSize
                                })
                                .raw()
                                .toBuffer();

                            const endSliceBuffer = await originalImage.clone()
                                .extract({
                                    left: paddingX,
                                    top: inputHeight - sliceSize,
                                    width: inputWidth - (paddingX * 2),
                                    height: sliceSize
                                })
                                .raw()
                                .toBuffer();


                            // Function to get average color
                            function getAverageColor(buffer, channels) {
                                let totalR = 0, totalG = 0, totalB = 0;
                                const totalPixels = buffer.length / channels;

                                for (let i = 0; i < buffer.length; i += channels) {
                                    totalR += buffer[i];
                                    totalG += buffer[i + 1];
                                    totalB += buffer[i + 2];
                                    // Ignore alpha channel if present
                                }

                                const avgR = Math.round(totalR / totalPixels);
                                const avgG = Math.round(totalG / totalPixels);
                                const avgB = Math.round(totalB / totalPixels);

                                return {r: avgR, g: avgG, b: avgB};
                            }

                            // Get average colors
                            const startColor = getAverageColor(startSliceBuffer, channels);
                            const endColor = getAverageColor(endSliceBuffer, channels);

                            // Function to generate background SVG
                            function generateBackgroundSVG(width, height, startColor, endColor, isPortrait) {
                                let svg;
                                if (isPortrait) {
                                    // Portrait image: horizontally split background
                                    svg = `
                                            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                                              <rect width="${width}" height="${height / 2}" fill="rgb(${startColor.r},${startColor.g},${startColor.b})" />
                                              <rect y="${height / 2}" width="${width}" height="${height / 2}" fill="rgb(${endColor.r},${endColor.g},${endColor.b})" />
                                            </svg>
                                          `;
                                } else {
                                    // Landscape output: vertical gradient
                                    svg = `
                                            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                                              <defs>
                                                 <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                  <stop offset="0%" style="stop-color:rgb(${startColor.r},${startColor.g},${startColor.b});stop-opacity:1" />
                                                  <stop offset="100%" style="stop-color:rgb(${endColor.r},${endColor.g},${endColor.b});stop-opacity:1" />
                                                </linearGradient>
                                              </defs>
                                              <rect width="${width}" height="${height}" fill="url(#grad)" />
                                            </svg>
                                          `;
                                }
                                return svg;
                            }

                            // Generate background SVG
                            const backgroundSVG = generateBackgroundSVG(outputWidth, outputHeight, startColor, endColor, isPortraitImage);

                            // Render SVG to image buffer
                            backgroundBuffer = await sharp(Buffer.from(backgroundSVG))
                                .png()
                                .toBuffer();


                            // Optional: Save the gradient background to a file
                            // await sharp(backgroundBuffer).toFile(dirPath + 'background.jpg');

                        } else if (backgroundType === 'black') {
                            // Create black background
                            backgroundBuffer = await sharp({
                                create: {
                                    width: outputWidth,
                                    height: outputHeight,
                                    channels: 3,
                                    background: {r: 0, g: 0, b: 0}
                                }
                            })
                                .png()
                                .toBuffer();
                        } else {
                            throw new Error(`Invalid background type "${backgroundType}". Use "gradient" or "black".`);
                        }

                        // Resize the input image if necessary
                        let resizedInputImage = await originalImage.clone();
                        let resizedInputWidth = inputWidth;
                        let resizedInputHeight = inputHeight;

                        if (inputWidth > outputWidth || inputHeight > outputHeight) {
                            const resizeOptions = {
                                fit: 'inside',
                                withoutEnlargement: true
                            };

                            let originalAspectRatio = inputHeight / inputWidth;

                            // resize to the smaller dimension while keeping scale
                            if (outputWidth <= outputHeight) {
                                // Constrain by width
                                resizeOptions.width = outputWidth;
                                resizedInputWidth = outputWidth;
                                resizedInputHeight = Math.round(outputWidth * originalAspectRatio);
                            } else {
                                // Constrain by height
                                resizeOptions.height = outputHeight;
                                resizedInputHeight = outputHeight;
                                resizedInputWidth = Math.round(outputHeight / originalAspectRatio);
                            }

                            resizedInputImage = await originalImage.clone().resize(resizeOptions);
                            const resizedMetadata = await resizedInputImage.metadata();

                        }

                        // Calculate offsets to center the image
                        let leftOffset, topOffset;


                        leftOffset = Math.round((outputWidth - resizedInputWidth) / 2);
                        topOffset = Math.round((outputHeight - resizedInputHeight) / 2);


                        console.log('offsets', {
                            leftOffset,
                            topOffset,
                            outputWidth,
                            outputHeight,
                            resizedInputWidth,
                            resizedInputHeight
                        })
                        // Modify outputFileName if exactWidth & exactHeight are supplied
                        let dimensionIdentifier;
                        if (exactWidth && exactHeight) {
                            dimensionIdentifier = `${exactWidth}x${exactHeight}`;
                        } else {
                            dimensionIdentifier = aspectRatio.replace(':', 'x');
                        }

                        // const outputDir = path.resolve(workDir, `${atcShowId}_output_images`);
                        const outputFileName = `${outputBaseName}_${inputBaseName}_${dimensionIdentifier}_${backgroundType}.jpg`;
                        const outputPath = path.join(outputDir, outputFileName);

                        // Composite the resized input image onto the background
                        await sharp(backgroundBuffer)
                            .composite([
                                {
                                    input: await resizedInputImage.clone().toBuffer(),
                                    top: topOffset,
                                    left: leftOffset
                                }
                            ])
                            .toFile(outputPath);

                        console.log(`Image saved to ${outputPath}`);
                    } catch (err) {
                        console.error(`Error processing aspect ratio ${item.aspectRatio} for image ${imagePath}:`, err.message);
                    }
                });

                // Wait for all tasks for this image to complete
                await Promise.all(tasks);

            } catch (err) {
                console.error(`Error processing image ${imagePath}:`, err.message);
            }
        }

        // Create output directory if it doesn't exist

        const outputDir = path.resolve(workDir, `${atcShowId}_output_images`);
        try {
            await fs.mkdir(outputDir, {recursive: true});
        } catch (err) {
            console.error('Error creating output directory:', err.message);
            process.exit(1);
        }

        if (workDir) {
            // Process all image files in the base directory
            const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif'];
            try {
                const files = await fs.readdir(workDir);
                const imageFiles = files.filter(file => supportedExtensions.includes(path.extname(file).toLowerCase()));
                if (imageFiles.length === 0) {
                    console.error('No image files found in the base directory.');
                    process.exit(1);
                }

                // Process each image file
                for (const file of imageFiles) {
                    const imagePath = path.join(workDir, file);
                    await processImageFile(imagePath);
                }
            } catch (err) {
                console.error('Error reading base directory:', err.message);
                process.exit(1);
            }
        } else if (inputPath) {
            // Process a single image file
            await processImageFile(inputPath);
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
})();
