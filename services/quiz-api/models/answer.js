const mongoose = require("mongoose");

var answerSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
            default: false,
        }
    }
);

module.exports = mongoose.model("Answer", answerSchema);