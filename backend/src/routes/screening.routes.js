const express = require("express");

const {
    createScreening,
    getScreening,
    getPatientScreenings
} = require("../controllers/screening.controller");

const router = express.Router();


// Create screening
router.post("/", createScreening);


// Get all screenings of a patient
router.get("/patient/:patient_id", getPatientScreenings);


// Get one screening
router.get("/:screening_id", getScreening);


module.exports = router;