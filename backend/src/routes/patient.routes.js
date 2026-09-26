const express = require("express");

const {
    createPatient,
    getPatients,
    getPatient
} = require("../controllers/patient.controller");

const router = express.Router();

router.post("/", createPatient);

router.get("/", getPatients);

router.get("/:patient_id", getPatient);

module.exports = router;