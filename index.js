const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas, loadImage } = require('canvas');
const block=require('cors');

const app = express();
const port = 5500;

// Parse JSON bodies
app.use(block());

app.use(bodyParser.json());

app.post('/decrypt', async (req, res) => {
    try {
        // Get Base64 string from request
        const base64String = req.body.base64_string;

        // Decode Base64 string
        const decodedData = Buffer.from(base64String, 'base64');

        // Perform decryption (if necessary)
        // Replace this with your decryption logic if needed
        
        // For demo, let's assume the decoded data is an image
        // Load the image using canvas
        const canvas = createCanvas(300, 150);
        const ctx = canvas.getContext('2d');
        const img = await loadImage(decodedData);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get the decrypted image as a Base64 string
        const decryptedImage = canvas.toDataURL();

        // Send the decrypted image URL as response
        res.send({ decrypted_image: decryptedImage });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
