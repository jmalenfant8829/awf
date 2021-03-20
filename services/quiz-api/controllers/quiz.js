var Quiz = require("../models/quiz")

function load(req, res, next, id){
    Quiz.findById(id)
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
    Quiz.create({
        userId: req.body.userId,
        title: req.body.title,
    })
    .then((savedQuiz) => {
        return res.json(savedQuiz);
    }, (e) => next(e));
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

function submit(req, res, next) {

}
module.exports = { load, get, create, update, list, remove, like };