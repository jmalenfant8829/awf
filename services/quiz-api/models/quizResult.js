const mongoose = require("mongoose");

var quizResultSchema = new mongoose.Schema({
    // text description of quiz question
    quizId: {
        type: mongoose.Schema.ObjectId,
        ref: "Quiz",
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
            
    },
    // list of questions with the selected answer
    results: [
        {
            questions: {
                type: mongoose.Schema.ObjectId,
                ref: "Question",
            }
        },
        {
            selected: {
                type: Number,
                required: true,
            }
        },
    ],
});

module.exports = mongoose.model('QuizResult', quizResultSchema);