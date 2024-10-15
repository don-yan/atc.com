const sharp = require('sharp');
const fs = require('fs');

const eventName = 'atc-025'
const dirPath = `img/${eventName}/`
const inputPath = dirPath + `${eventName}-square.png`;

const outputPath = dirPath+ 'output-blurred-2.jpg'; // Output image path

(async () => {
  try {
    // Read input image
    const inputImage = sharp(inputPath);

    // Get metadata to find dimensions
    const metadata = await inputImage.metadata();
    const inputWidth = metadata.width;
    const inputHeight = metadata.height;

    // Check if image is square
    if (inputWidth !== inputHeight) {
      console.error('Input image is not square!');
      return;
    }

    // Decide on output dimensions
    // Keep height, calculate width for 16:9 aspect ratio
    const outputHeight = inputHeight;
    const outputWidth = Math.round(outputHeight * 16 / 9);

    // Create blurred background
    const background = await sharp(inputPath)
      .resize(outputWidth, outputHeight) // Stretch to 16:9
      .blur(55) // Apply blur; adjust radius as needed
      .toBuffer();

    // Calculate left and top offsets to center the image
    const left = Math.round((outputWidth - inputWidth) / 2);
    const top = 0; // Since heights are the same

    // Composite the input image onto the blurred background
    await sharp(background)
      .composite([{
        input: inputPath,
        top: top,
        left: left
      }])
      .toFile(outputPath);

    console.log('Image saved to', outputPath);
  } catch (err) {
    console.error('Error:', err);
  }
})();
