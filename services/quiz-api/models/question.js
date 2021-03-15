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
            type: mongoose.Schema.ObjectId,
            ref: "Answer",
        },
    ],
});

module.exports = mongoose.model('Question', questionSchema);