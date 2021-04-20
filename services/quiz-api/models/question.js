const mongoose = require("mongoose");
var Answer = require("./answer").schema;

var questionSchema = new mongoose.Schema({
    // text description of quiz question
    description: {
        type: String,
        required: true,
    },
    // possible answers to quiz question
    answers: [Answer],
});

module.exports = mongoose.model('Question', questionSchema);