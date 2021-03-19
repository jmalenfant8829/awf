import Quiz from "../models/quiz"

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
        // convert req arguments to model here
    })
    .then((savesQuiz) => {
        return res.json(savedQuiz);
    }, (e) => next(e));
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