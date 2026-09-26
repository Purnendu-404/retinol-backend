require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const cloudinary = require("./config/cloudinary");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    try {
        const result = await cloudinary.api.ping();
        console.log("Cloudinary connected:", result.status);
    } catch (error) {
        console.error("Cloudinary connection failed:", error.message);
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();