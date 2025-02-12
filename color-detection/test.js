const { createCanvas, loadImage } = require('canvas');

// Function to detect color and return RGB values
function detectColor(imagePath) {
    // Load the image
    loadImage(imagePath).then(img => {
        // Create a canvas element
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Iterate through each pixel
        let sumR = 0, sumG = 0, sumB = 0;
        for (let i = 0; i < data.length; i += 4) {
            sumR += data[i];
            sumG += data[i + 1];
            sumB += data[i + 2];
        }

        // Calculate average RGB values
        const avgR = Math.round(sumR / (data.length / 4));
        const avgG = Math.round(sumG / (data.length / 4));
        const avgB = Math.round(sumB / (data.length / 4));

        // Output RGB values
        console.log("Detected RGB color: (" + avgR + ", " + avgG + ", " + avgB + ")");
    });
}

// Example usage:
const imagePath = 'path/to/your/image.jpg'; // Provide the path to your image here
detectColor(imagePath);
