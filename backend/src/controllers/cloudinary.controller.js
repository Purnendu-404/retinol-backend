const cloudinary = require("../config/cloudinary");

const getUploadSignature = async (req, res) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder: "retinal_screening"
            },
            process.env.CLOUDINARY_API_SECRET
        );

        res.status(200).json({
            success: true,
            timestamp,
            signature,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            folder: "retinal_screening"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate upload signature"
        });
    }
};

module.exports = {
    getUploadSignature
};