
const { db } = require('../models/quizResult');
const QuizResult = require('../models/quizResult');
const User = require('../models/user');

async function loadUser(req, res, next, username) {
    const user = await User.findOne({ username: username });
    
    if (user) {
        req.dbUser = user;
        next();
    }
    else {
        res.status(400).json({success: false, message: "Invalid username"});
    }
}

async function submit(req, res) {
    
    var quizResult = await QuizResult.findOne({ 'userId': req.dbUser._id, 'quizId': req.dbQuiz._id });
    // create or edit quizresult
    if (quizResult) {
        quizResult.selectedAnswers = req.body.selectedAnswers;
    }
    else {
        quizResult = QuizResult({
            userId: req.dbUser._id,
            quizId: req.dbQuiz._id,
            selectedAnswers: req.body.selectedAnswers
        });
    }
    
    await quizResult.save();

    return res.status(200).json({
        message: "Success!",
        score: quizResult.score,
        totalCorrect: quizResult.totalCorrect,
        totalQuestions: quizResult.totalQuestions,
    });
}

async function get(req, res) {
    const quizResult = await QuizResult.findOne({ 'userId': req.dbUser._id, 'quizId': req.dbQuiz._id });

    if (quizResult) {
        return res.json(quizResult);
    }
    else {
        return res.status(404)
    }
}

module.exports = { submit, loadUser, get };