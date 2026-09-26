const express = require("express");

const {
    predictRetina
} = require("../controllers/ml.controller");

const router = express.Router();

router.post("/predict", predictRetina);

module.exports = router;