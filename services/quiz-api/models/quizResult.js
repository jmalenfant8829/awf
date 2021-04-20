const mongoose = require("mongoose");
const Answer = require("./answer");
const Quiz = require("./quiz");

//test that selected answer is a part of the quiz
async function singleQuizValidator(answerId, thisQuizResult) {

    var result = false;
    var quizOfAnswer = await Quiz.findOne({ 'questions.answers._id': answerId });

    if (quizOfAnswer) {
        result = (String(thisQuizResult.quizId) === String(quizOfAnswer.id));
    }
    else {
        result = false;
    }

    return result;
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