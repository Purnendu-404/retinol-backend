const axios = require("axios");

const ML_SERVICE_URL = "http://127.0.0.1:5001";

async function predictImage(imageUrl) {
    const response = await axios.post(
        `${ML_SERVICE_URL}/predict-url`,
        {
            image_url: imageUrl
        },
        {
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 60000
        }
    );

    return response.data;
}

module.exports = {
    predictImage
};