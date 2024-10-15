const sharp = require('sharp');
const fs = require('fs');

// TODO: loop through image tuples
const eventName = 'atc-025'
const dirPath = `img/${eventName}/`
const inputPath = dirPath + `${eventName}-square.png`;

// NOTE: add any additional aspect ratios here...
const imageVariants = [[16,9],[3,2],[4,5]];


const resizeImage = async (aspectWidth,aspectHeight) => {

    const outputPath = dirPath + `output-${aspectWidth}x${aspectHeight}.jpg`; // Output image path

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
        // Option 1: Keep height, calculate width
        const outputHeight = inputHeight;
        const outputWidth = Math.round(outputHeight * aspectWidth / aspectHeight);

        // Create black background image
        const background = sharp({
            create: {
                width: outputWidth,
                height: outputHeight,
                channels: 3,
                background: {r: 0, g: 0, b: 0}
            }
        });

        // Calculate left and top offsets to center the image
        const left = Math.round((outputWidth - inputWidth) / 2);
        const top = Math.round((outputHeight - inputHeight) / 2);

        // Composite the input image onto the background
        await background
            .composite([{
                input: await inputImage.toBuffer(),
                top: top,
                left: left
            }])
            .toFile(outputPath);

        console.log('Image saved to', outputPath);
    } catch (err) {
        console.error('Error:', err);
    }
}

(async () => {

    console.log('script start')
    await Promise.all(imageVariants.map(aspectRatio=>{
        return resizeImage(aspectRatio[0],aspectRatio[1]);
    }))
    console.log('script end')
})();
