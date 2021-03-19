var mongoose = require('mongoose');
var config = require('../../config/database');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
import Quiz from '../../models/quiz';
import quizCtrl from '../../controllers/quiz'


//change routes and mount to /quiz later

//Fetches a list of all available quizzes, could be given query string
//specifying name
router.get('/quiz')
    .get(quizCtrl.list)
    .post(quizCtrl.create);

//Creates a new quiz with the supplied information. 
//Expected Data: Name, Question Data 
router.post('/quiz', function(req, res){


});

//Fetches question and other data for a single quiz
router.get('/quiz/:quizId', function (req, res){
    Quiz.findById(quizId)
});

//Updates a quiz with the specified ID using the supplied information. 
//Expected Data: Name, Question Data (JSON) 
router.patch('/quiz/:quizId', function(req, res){

});

//Deletes the quiz with the specified ID
router.delete('/quiz/:quizId', function(req, res){

});

//Submits a response for a quiz. 
//Expected Data: Answer Data (JSON)
router.post('/quiz/:quizId', function(req, res){

});

//Like a quiz if it is not already liked, unlike it if it is already liked
router.get('/quiz/like/:quizId', function(req, res){

});
