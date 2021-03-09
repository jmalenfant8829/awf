const mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    // text description of quiz question
    description: {
        type: String,
        required: true,
    },
    // possible answers to quiz question
    answers: [
        {
            description: {
                type: String,
                required: true,
            }
        },
        {
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        },
    ],
});

module.exports = mongoose.model('Question', questionSchema);