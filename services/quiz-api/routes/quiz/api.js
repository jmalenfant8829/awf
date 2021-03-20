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


//Fetches question and other data for a single quiz
router.route('/quiz/:quizId')
    .get(quizCtrl.get)
    .patch(quizCtrl.update)
    .delete(quizCtrl.remove);
    //.post(quizCtrl)


router.route('/quiz/like/:quizId')
    .get(quizCtrl.like);

router.param('quizId', quizCtrl.load);
module.exports = router;

// //Submits a response for a quiz. 
// //Expected Data: Answer Data (JSON)
// router.post('/quiz/:quizId', function(req, res){

// });

// //Like a quiz if it is not already liked, unlike it if it is already liked
// router.get('/quiz/like/:quizId', function(req, res){

// });
