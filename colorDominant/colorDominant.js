// this function works perfectly.
// Function to detect the dominant color in an image
function ColorDetector(imageUrl) {
    // Check if imageUrl is provided
    if (!imageUrl) {
        return 'There is no image provided';
    }

    // Create an image element
    const img = new Image();

    // Set crossOrigin to anonymous to bypass CORS restrictions
    img.crossOrigin = "Anonymous";

    // Return a Promise to handle asynchronous loading of the image
    return new Promise((resolve, reject) => {
        img.onload = () => {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions to match image dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Get image data from the canvas
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // Initialize an object to store color counts
            const colorCounts = {};

            // Loop through image data to count colors
            for (let i = 0; i < imageData.length; i += 4) {
                const color = `rgb(${imageData[i]},${imageData[i + 1]},${imageData[i + 2]})`;
                colorCounts[color] = (colorCounts[color] || 0) + 1;
            }

            // Find the color with the highest count (dominant color)
            let maxCount = 0;
            let dominantColor = '';
            for (const color in colorCounts) {
                if (colorCounts[color] > maxCount) {
                    maxCount = colorCounts[color];
                    dominantColor = color;
                }
            }

            // Resolve the Promise with the dominant color
            resolve(`The dominant color in the image is: ${dominantColor}`);
        };

        // Handle image load errors
        img.onerror = () => {
            reject('The URL provided is invalid');
        };

        // Set the image source to start loading
        img.src = imageUrl;
    });
}

// Example usage:
const imageUrl = 'https://staticg.sportskeeda.com/editor/2023/10/cbd97-16970862331255-1920.jpg';
ColorDetector(imageUrl)
    .then(dominantColor => console.log(dominantColor))
    .catch(error => console.error(error));

