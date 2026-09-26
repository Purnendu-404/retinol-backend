const axios = require("axios");

const ML_SERVICE_URL = process.env.FLASK_URL;

async function predictImage(imageUrl) {
  const response = await axios.post(
    `${ML_SERVICE_URL}/predict-url`,
    {
      image_url: imageUrl,
    },
    {
      timeout: 120000, // 2 minutes max for the actual prediction request
    }
  );

  return response.data;
}

module.exports = {
  predictImage,
};