var User = require("../models/user");
var Quiz = require("../models/quiz");
var Question = require("../models/question");
var Answer = require("../models/answer");
var QuizResult = require("../models/quizResult");

const faker = require('faker');

module.exports.getTestUser = function() {

    // define user
    user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    });
    
    // define user's quizzes
    quiz1 = new Quiz({ title: faker.lorem.sentence(), userId: user.id, });
    quiz2 = new Quiz({ userId: user.id, title: faker.lorem.sentence(), });

    user.createdQuizzes.push(quiz1, quiz2);

    // define questions for quizzes
    quiz1question1 = new Question({ quizId: quiz1.id, description: faker.lorem.sentence(),});
    quiz1question2 = new Question({ quizId: quiz1.id, description: faker.lorem.sentence(), });
    quiz2question1 = new Question({ quizId: quiz2.id, description: faker.lorem.sentence(), });
    quiz2question2 = new Question({ quizId: quiz2.id, description: faker.lorem.sentence(), });

    user.createdQuizzes[0].questions.push(quiz1question1, quiz1question2);
    user.createdQuizzes[1].questions.push(quiz2question1, quiz2question2);

    // define correct/incorrect answers to questions
    quiz1question1answer1 = new Answer({ questionId: quiz1question1.id, description: faker.lorem.sentence(), isCorrect: true });
    quiz1question1answer2 = new Answer({ questionId: quiz1question1.id, description: faker.lorem.sentence(), isCorrect: false });
    quiz1question2answer1 = new Answer({ questionId: quiz1question2.id, description: faker.lorem.sentence(), isCorrect: true });
    quiz1question2answer2 = new Answer({ questionId: quiz1question2.id, description: faker.lorem.sentence(), isCorrect: false });
    
    quiz2question1answer1 = new Answer({ questionId: quiz2question1.id, description: faker.lorem.sentence(), isCorrect: true });
    quiz2question1answer2 = new Answer({ questionId: quiz2question1.id, description: faker.lorem.sentence(), isCorrect: false });
    quiz2question2answer1 = new Answer({ questionId: quiz2question2.id, description: faker.lorem.sentence(), isCorrect: true });
    quiz2question2answer2 = new Answer({ questionId: quiz2question2.id, description: faker.lorem.sentence(), isCorrect: false });

    user.createdQuizzes[0].questions[0].answers.push(quiz1question1answer1, quiz1question1answer2);
    user.createdQuizzes[0].questions[1].answers.push(quiz1question2answer1, quiz1question2answer2);

    user.createdQuizzes[1].questions[0].answers.push(quiz2question1answer1, quiz2question1answer2);
    user.createdQuizzes[1].questions[1].answers.push(quiz2question2answer1, quiz2question2answer2);

    return user;

    // return new User({
    //     username: faker.internet.userName(),
    //     email: faker.internet.email(),
    //     password: faker.internet.password(),
    //     createdQuizzes: [
    //         new Quiz({
    //             title: faker.lorem.sentence(),
    //             questions: [
    //                 new Question({
    //                     description: faker.lorem.sentence(),
    //                     answers: [
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: true,
    //                         }),
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: false,
    //                         }),
    //                     ],
    //                 }),
    //                 new Question({
    //                     description: faker.lorem.sentence(),
    //                     answers: [
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: true,
    //                         }),
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: false,
    //                         }),
    //                     ],
    //                 }),
    //                 new Question({
    //                     description: faker.lorem.sentence(),
    //                     answers: [
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: true,
    //                         }),
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: false,
    //                         }),
    //                     ],
    //                 }),
    //             ],
    //         }),
    //         new Quiz({
    //             title: faker.lorem.sentence(),
    //             questions: [
    //                 new Question({
    //                     description: faker.lorem.sentence(),
    //                     answers: [
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: true,
    //                         }),
    //                         new Answer({
    //                             description: faker.lorem.sentence(),
    //                             isCorrect: false,
    //                         }),
    //                     ],
    //                 }),
    //             ],
    //         }),
    //     ],
    // });
}