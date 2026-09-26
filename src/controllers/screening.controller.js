const Screening = require("../models/Screening");
const Patient = require("../models/Patient");
const { predictImage } = require("../services/ml.service");

// Create screening
const createScreening = async (req, res) => {
    try {
        const {
            patient_id,
            image_url
        } = req.body;

        if (!patient_id || !image_url) {
            return res.status(400).json({
                success: false,
                message: "patient_id and image_url are required"
            });
        }

        // Find patient
        const patient = await Patient.findOne({
            patient_id
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        // Send image URL to ML service
        const mlResult = await predictImage(image_url);

        const {
            prediction,
            grade,
            confidence,
            probabilities,
            processed_image,
            edge_image
        } = mlResult;

        // Save screening
        const screening = await Screening.create({
            patient: patient._id,
            image_url,
            prediction,
            confidence,
            probabilities,
            grade
        });

        return res.status(201).json({
            success: true,
            message: "Screening created successfully",
            data: {
                ...screening.toObject({ flattenMaps: true }),
                processed_image,
                edge_image
            }
        });

    } catch (error) {
        console.error("Screening creation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create screening",
            error: error.message
        });
    }
};


// Get one screening
const getScreening = async (req, res) => {
    try {
        const screening = await Screening.findById(
            req.params.screening_id
        ).populate("patient");

        if (!screening) {
            return res.status(404).json({
                success: false,
                message: "Screening not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: screening
        });

    } catch (error) {
        console.error("Get screening error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch screening",
            error: error.message
        });
    }
};


// Get all screenings of a patient
const getPatientScreenings = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            patient_id: req.params.patient_id
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        const screenings = await Screening.find({
            patient: patient._id
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: screenings.length,
            data: screenings
        });

    } catch (error) {
        console.error("Get patient screenings error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch patient screenings",
            error: error.message
        });
    }
};


module.exports = {
    createScreening,
    getScreening,
    getPatientScreenings
};