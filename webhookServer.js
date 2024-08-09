const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { url, content, embeds } = req.body;

    // Construct payload with optional embeds
    const payload = {
        content,
        ...(embeds && { embeds }) // Only include embeds if they exist
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            res.status(200).json({ message: 'Message sent successfully' });
        } else {
            res.status(response.status).json({ message: 'Failed to send message' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
