const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        image_url: {
            type: String,
            required: true,
            trim: true
        },

        prediction: {
            type: String,
            required: true,
            trim: true
        },

        confidence: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        },

        probabilities: {
            type: Map,
            of: Number
        },

        disease: {
            type: String,
            trim: true
        },

        grade: {
            type: Number,
            required: true,
            min: 0,
            max: 4
        },

        quality_status: {
            type: String,
            enum: ["PASS", "FAIL"]
        },

        quality_score: {
            type: Number,
            min: 0,
            max: 1
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Screening", screeningSchema);