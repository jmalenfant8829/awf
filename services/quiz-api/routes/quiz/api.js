var quizCtrl = require( '../../controllers/quiz')

//require('../../config/passport')(passport);
var express = require('express');
var router = express.Router();


//change routes and mount to /quiz later

//Fetches a list of all available quizzes, could be given query string
//specifying name
router.route('/quiz')
    .get(quizCtrl.list)
    .post(quizCtrl.create);

router.route('/quiz/search')
    .get(quizCtrl.search)

//Fetches question and other data for a single quiz
router.route('/quiz/:quizId')
    .get(quizCtrl.get)
    .patch(quizCtrl.update)
    .delete(quizCtrl.remove);

router.route('/quiz/like/:quizId')
    .get(quizCtrl.like);

router.param('quizId', quizCtrl.load);

module.exports = router;

