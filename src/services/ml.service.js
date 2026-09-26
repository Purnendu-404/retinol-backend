const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

async function waitForML() {
  const maxWaitTime = 2 * 60 * 1000;
  const checkInterval = 10 * 1000;

  const startTime = Date.now();
  let attempt = 1;

  while (Date.now() - startTime < maxWaitTime) {
    try {
      console.log(`Checking ML service readiness (attempt ${attempt})`);

      const response = await axios.get(`${ML_SERVICE_URL}/health`, {
        timeout: 10000,
      });

      if (response.status === 200) {
        console.log("ML service is ready");
        return;
      }
    } catch (error) {
      console.log(
        `ML service not ready: ${error.response?.status || error.message}`
      );
    }

    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const remaining = Math.max(
      0,
      Math.round((maxWaitTime - (Date.now() - startTime)) / 1000)
    );

    console.log(
      `Waiting 10 seconds... ${elapsed}s elapsed, ${remaining}s remaining`
    );

    await new Promise((resolve) => setTimeout(resolve, checkInterval));

    attempt++;
  }

  throw new Error("ML service did not become ready within 2 minutes.");
}


async function predictImage(imageUrl) {
  await waitForML();

  const response = await axios.post(
    `${ML_SERVICE_URL}/predict-url`,
    {
      image_url: imageUrl,
    },
    {
      timeout: 120000,
    }
  );

  return response.data;
}


module.exports = {
  waitForML,
  predictImage,
};