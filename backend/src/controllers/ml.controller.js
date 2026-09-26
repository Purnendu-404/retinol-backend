const { predictImage } = require("../services/ml.service");

const predictRetina = async (req, res) => {
    try {
        const { image_url } = req.body;

        if (!image_url) {
            return res.status(400).json({
                success: false,
                message: "image_url is required"
            });
        }

        const result = await predictImage(image_url);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("ML prediction error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to get prediction from ML service",
            error: error.message
        });
    }
};

module.exports = {
    predictRetina
};