const mongoose = require("mongoose");
const question = require("./question");
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

    // percent score user got on quiz
    score: {
        type: mongoose.Schema.Types.Number,
    },

    // number of correct answers in quiz
    totalCorrect: {
        type: mongoose.Schema.Types.Number,
    },

    // number of answers in quiz
    totalQuestions: {
        type: mongoose.Schema.Types.Number,
    },
});

quizResultSchema.pre('save', async function () {
    const scoreValues = await quizResultScore(this);
    this.score = scoreValues.score;
    this.totalCorrect = scoreValues.totalCorrect;
    this.totalQuestions = scoreValues.totalAnswers;
});

async function quizResultScore(thisQuizResult) {

    const quiz = await Quiz.findById(thisQuizResult.quizId);
    const questions = quiz.questions;

    var numCorrect = 0;
    var totalQuestions = 0;

    for (var i = 0; i < questions.length; i++) {
        answers = questions[i].answers;
        for (var j = 0; j < answers.length; j++) {
            answerIsSelected = false;
            for (var answerId of thisQuizResult.selectedAnswers) {
                if (answers[j]._id.equals(answerId)) {
                    answerIsSelected = true;
                    break;
                }
            }

            if (answerIsSelected && answers[j].isCorrect) {
                numCorrect++;
            }
        }
        totalQuestions++;
    }

    var score = 0;
    if (answers.length !== 0) {
        score = numCorrect / totalQuestions;
    }
    
    scoreValues = {
        score: score,
        totalCorrect: numCorrect,
        totalAnswers: totalQuestions,
    };

    return scoreValues;
};

module.exports = mongoose.model('QuizResult', quizResultSchema);