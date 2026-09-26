const Patient = require("../models/Patient");

// Create patient
const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);

        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            data: patient
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create patient",
            error: error.message
        });
    }
};

// Get all patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch patients",
            error: error.message
        });
    }
};

// Get one patient
const getPatient = async (req, res) => {
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

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch patient",
            error: error.message
        });
    }
};

module.exports = {
    createPatient,
    getPatients,
    getPatient
};