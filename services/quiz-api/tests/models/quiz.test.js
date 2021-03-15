var expect = require('chai').expect;
var User = require("../../models/user");
var Quiz = require("../../models/quiz");
var Question = require("../../models/question");
var Answer = require("../../models/answer");
const faker = require('faker');

describe("Quiz Model", function () {

    it('should be invalid without title', function (done) {
        var quiz = new Quiz();
        quiz.validate(function (err) {
            expect(err.errors.title).to.exist;
            done();
        });
    });

    it('should be valid with valid title', function (done) {
        var quiz = new Quiz({
            title: faker.lorem.sentence(),
        });
        quiz.validate(function (err) {
            expect(err).to.be.null;
            done();
        });
    });

    it('should be valid given valid array of users who have liked quiz', function (done) {
        var quiz = new Quiz({
            title: faker.lorem.sentence(),
            likers: [
                new User({
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                }),
                new User({
                    username: faker.internet.userName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                }),
            ],
        });
        quiz.validate(function (err) {
            expect(err).to.be.null;
            expect(quiz.likers).to.have.lengthOf(2);
            done();
        });
    });

    it('should be valid given valid array of questions', function (done) {
        var quiz = new Quiz({
            title: faker.lorem.sentence(),
            questions: [
                new Question({
                    description: faker.lorem.sentence(),
                    answers: [
                        new Answer({
                            description: faker.lorem.sentence(),
                            isCorrect: true,
                        }),
                        new Answer({
                            description: faker.lorem.sentence(),
                            isCorrect: false,
                        }),
                    ],
                }),
                new Question({
                    description: faker.lorem.sentence(),
                    answers: [
                        new Answer({
                            description: faker.lorem.sentence(),
                            isCorrect: true,
                        }),
                        new Answer({
                            description: faker.lorem.sentence(),
                            isCorrect: false,
                        }),
                    ],
                }),
            ],
        });
        quiz.validate(function (err) {
            expect(err).to.be.null;
            expect(quiz.questions).to.have.lengthOf(2);
            done();
        });
    });

});