const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patient.routes");
const screeningRoutes = require("./routes/screening.routes");
const cloudinaryRoutes = require("./routes/cloudinary.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Retinal Screening Backend is running"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

app.use("/api/patients", patientRoutes);
app.use("/api/screenings", screeningRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

module.exports = app;