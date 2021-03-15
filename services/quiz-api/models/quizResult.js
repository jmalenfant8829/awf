const mongoose = require("mongoose");

var quizResultSchema = new mongoose.Schema({
    // user who submitted the quiz
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
            
    },
    // list of selected quiz answers
    selectedAnswers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Answer",
        },
    ],
});

module.exports = mongoose.model('QuizResult', quizResultSchema);