var Quiz = require("../models/quiz")
var User = require("../models/user")
var mongoose = require('mongoose');
function load(req, res, next, id){
    if(mongoose.Types.ObjectId.isValid(id)) {
        Quiz.findById(id)
            .populate('questions')
            .exec()
            .then((quiz) => {
                req.dbQuiz = quiz;
                return next();

            }, (e) => next(e));
    }
    else {
        res.status(400).json({message: 'invalid id'})
    }
}

function get(req, res) {
    return res.json(req.dbQuiz)  
}

function create(req, res) {

    // only user should be able to make their own quizzes
    if (!(String(req.user._id) === (req.body.userId))) {
        return res.status(403).json("Unauthorized.");
    }

    Quiz.create(req.body)
    .then((savedQuiz) => {
        User.findByIdAndUpdate(savedQuiz.userId, { $push: { createdQuizzes: savedQuiz.id } })
        return res.json(savedQuiz);
    }, (e) => next(e))
    .catch((err) => {
        res.status(400).json({message: 'Error ', err})
    })
}

function update(req, res, next) {

    const quiz = req.dbQuiz;
    // only user should be able to update their own quizzes
    if (!(req.user._id.equals(quiz.userId))) {
        return res.status(403).json("Unauthorized.");
    }

    Object.assign(quiz, req.body);

    quiz.save(() => res.sendStatus(204),
        (e) => next(e));
}

function list(req, res, next) {
    const {limit = 50, skip = 0 } = req.query;
    Quiz.find()
        .populate('questions')
        .populate('likers')
        .skip(skip)
        .limit(limit)
        .exec()
        .then((quizzes) => res.json(quizzes),
        (e) => next(e));
    
}

function remove(req, res, next) {

    const quiz = req.dbQuiz;
    // only user should be able to delete their own quizzes
    if (!(req.user._id.equals(quiz.userId))) {
        return res.status(403).json("Unauthorized.");
    }
    
    Object.assign(quiz)
    quiz.remove()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

async function like(req, res) {
    
    // users should only be allowed to like quizzes for themselves
    if (!(String(req.user._id) === (req.body.userId))) {
        return res.status(403).json("Unauthorized.");
    }

    const quiz = req.dbQuiz;
    Object.assign(quiz, req.body);
    userId = req.body.userId;
    var idx = quiz.likers ? quiz.likers.indexOf(userId) : -1;
    res.sendStatus(204);
    // is it valid?
    if (idx !== -1) {
        // remove it from the array.
        quiz.likers.splice(idx, 1);
        res.json({liked: false});
    }
    else {
        quiz.likers.push(userId);
        res.json({liked: true});
    }
    await quiz.save();
}

function search(req, res, next) {
    const searchString = req.query.search
    Quiz.find({$text: {$search: searchString}})
        .limit(10)
        .exec()
        .then((quizzes) => res.json(quizzes),
        (e) => next(e));
}


module.exports = { load, get, create, update, list, remove, like, search };