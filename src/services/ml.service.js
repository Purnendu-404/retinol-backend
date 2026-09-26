const axios = require("axios");

const ML_SERVICE_URL = process.env.FLASK_URL;

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

async function predictImage(imageUrl) {
    const MAX_ATTEMPTS = 3;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            console.log(
                `ML prediction attempt ${attempt}/${MAX_ATTEMPTS}`
            );

            const response = await axios.post(
                `${ML_SERVICE_URL}/predict-url`,
                {
                    image_url: imageUrl
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 120000
                }
            );

            console.log("ML prediction successful");

            return response.data;

        } catch (error) {
            console.error(
                `ML attempt ${attempt} failed:`,
                error.response?.status || error.message
            );

            if (attempt === MAX_ATTEMPTS) {
                throw error;
            }

            console.log("Waiting 10 seconds before retry...");

            await sleep(10000);
        }
    }
}

module.exports = {
    predictImage
};