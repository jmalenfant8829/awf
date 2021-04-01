var Quiz = require("../models/quiz")

function load(req, res, next, id){
    Quiz.findById(id)
        .populate('questions')
        .populate('likers')
        .exec()
        .then((quiz) => {
            req.dbQuiz = quiz;
            return next();

        }, (e) => next(e));
}

function get(req, res) {
    return res.json(req.dbQuiz)  
}

function create(req, res) {
    Quiz.create(req.body)
    .then((savedQuiz) => {
        return res.json(savedQuiz);
    }, (e) => next(e))
    .catch((err) => {
        res.status(500).json({message: 'Error ', err})
    })
}

function update(req, res, next) {
    const quiz = req.dbQuiz;
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
    quiz.remove()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

function like(req, res, next) {
    //const {limit = }
}

function search(req, res, next) {
    const searchString = req.query.search
    console.log(searchString)
    Quiz.find({$text: {$search: searchString}})
        .limit(10)
        .exec()
        .then((quizzes) => res.json(quizzes),
        (e) => next(e));
}


module.exports = { load, get, create, update, list, remove, like, search };