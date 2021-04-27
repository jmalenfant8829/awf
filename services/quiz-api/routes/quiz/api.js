var quizCtrl = require( '../../controllers/quiz')
var quizResultCtrl = require( '../../controllers/quizResult')

const passport = require('passport');
var express = require('express');
var router = express.Router();


//change routes and mount to /quiz later

//Fetches a list of all available quizzes, could be given query string
//specifying name
router.route('/quiz')
    .get(quizCtrl.list)
    .post(passport.authenticate('jwt', { session: false }), quizCtrl.create);

router.route('/quiz/search')
    .get(quizCtrl.search)

//Fetches question and other data for a single quiz
router.route('/quiz/:quizId')
    .get(quizCtrl.get)
    .patch(passport.authenticate('jwt', { session: false }), quizCtrl.update)
    .delete(passport.authenticate('jwt', { session: false }), quizCtrl.remove);

router.route('/quiz/:quizId/like')
    .post(passport.authenticate('jwt', { session: false }), quizCtrl.like);


router.route('/quiz/:quizId/result/:username')
    .get(quizResultCtrl.get)
    .put(passport.authenticate('jwt', { session: false }), quizResultCtrl.submit);


router.param('quizId', quizCtrl.load);
router.param('username', quizResultCtrl.loadUser);

module.exports = router;

