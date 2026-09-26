const axios = require("axios");

const ML_SERVICE_URL = process.env.FLASK_URL;

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


async function waitForML() {
    const MAX_ATTEMPTS = 6;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            console.log(
                `Checking ML service readiness ${attempt}/${MAX_ATTEMPTS}`
            );

            const response = await axios.get(
                `${ML_SERVICE_URL}/health`,
                {
                    timeout: 30000
                }
            );

            if (response.status === 200) {
                console.log("ML service is ready.");
                return;
            }

        } catch (error) {
            console.log(
                "ML service not ready:",
                error.response?.status || error.message
            );
        }

        if (attempt < MAX_ATTEMPTS) {
            console.log("Waiting 10 seconds for ML service...");
            await sleep(10000);
        }
    }

    throw new Error("ML service did not become ready.");
}


async function predictImage(imageUrl) {

    // Wake Render/Flask and wait for the ML service.
    await waitForML();

    console.log("Sending image to ML service...");

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
}


module.exports = {
    predictImage
};