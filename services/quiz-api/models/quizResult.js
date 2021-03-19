const mongoose = require("mongoose");
const Question = require("./question");
const Quiz = require("./quiz");

//test that selected answer is a part of the quiz
async function singleQuizValidator(answer, thisContext) {
    var thisQuizId = thisContext.quizId;
    question = await Question.findById(answer.questionId);

    if (question) {
        return (String(thisQuizId) === String(question.quizId));
    }
    else {
        return false;
    }
}

var quizResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },

    // list of selected quiz answers
    selectedAnswers: [{
        type: mongoose.Schema.ObjectId,
        ref: "Answer",
        validate: {
            validator: async function (v) {
                return await singleQuizValidator(v, this);
            },
            message: "Selected answers must all belong to the specified quiz",
        },
    }],
});

module.exports = mongoose.model('QuizResult', quizResultSchema);