var expect = require('chai').expect;
var Question = require("../../models/question");
var Answer = require("../../models/answer");
const faker = require('faker');
const getTestUser = require("../../testUtils/schemaSamples").getTestUser;

describe("Question Model", function () {

    var testUser;

    beforeEach(async () => {
        testUser = getTestUser();
    });

    it('should be invalid without question description', function (done) {
        var question = new Question({
            quizId: testUser.createdQuizzes[0].id,
        });
        question.validate(function (err) {
            expect(err.errors.description).to.exist;
            done();
        });
    });

    it('should be invalid without quiz', function (done) {
        var question = new Question({
            description: faker.lorem.sentence(),
        });
        question.validate(function (err) {
            expect(err.errors.quizId).to.exist;
            done();
        });
    });

    it('should be valid with valid description', function (done) {
        var question = new Question({
            quizId: testUser.createdQuizzes[0].id,
            description: faker.lorem.sentence(),
        });
        question.validate(function (err) {
            expect(err).to.be.null;
            done();
        });
    });

    it('should be valid given answer array', function (done) {
        var question = new Question({
            quizId: testUser.createdQuizzes[0].id,
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
        });
        question.validate(function (err) {
            expect(err).to.be.null;
            expect(question.answers).to.have.lengthOf(2);
            done();
        });
    });

});