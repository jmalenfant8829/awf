var expect = require('chai').expect;
var QuizResult = require("../../models/quizResult");

const getTestUser = require("../../testUtils/schemaSamples").getTestUser;

describe("Quiz Result Model", function () {

    var testUser;

    beforeEach((done) => {
        testUser = getTestUser();
        done();
    });

    it('should only contain answers for one quiz', async () => {
        await testUser.save();
        await testUser.createdQuizzes[0].save();
        await testUser.createdQuizzes[1].save();

        await testUser.createdQuizzes[0].questions[0].save();
        await testUser.createdQuizzes[0].questions[1].save();
        await testUser.createdQuizzes[1].questions[0].save();

        await testUser.createdQuizzes[0].questions[0].answers[0].save();
        await testUser.createdQuizzes[0].questions[1].answers[1].save();
        await testUser.createdQuizzes[1].questions[0].answers[0].save();

        var quizResult = new QuizResult({
            userId: testUser.id,
            quizId: testUser.createdQuizzes[0].id,
            selectedAnswers: [
                testUser.createdQuizzes[0].questions[0].answers[0],
                testUser.createdQuizzes[0].questions[1].answers[1],
                // this answer is from another quiz - invalid!
                testUser.createdQuizzes[1].questions[0].answers[0],
            ],
        });

        var err = null;
        try {
            await quizResult.validate();
        }
        catch (e) {
            err = e;
        }
       expect(err.errors).to.exist;
    });

    it('should be valid with answers from one specific quiz', async () => {
        await testUser.save();
        await testUser.createdQuizzes[0].save();

        await testUser.createdQuizzes[0].questions[0].save();
        await testUser.createdQuizzes[0].questions[1].save();

        await testUser.createdQuizzes[0].questions[0].answers[0].save();
        await testUser.createdQuizzes[0].questions[1].answers[1].save();

        var quizResult = new QuizResult({
            userId: testUser.id,
            quizId: testUser.createdQuizzes[0].id,
            selectedAnswers: [
                testUser.createdQuizzes[0].questions[0].answers[0],
                testUser.createdQuizzes[0].questions[1].answers[1],
            ],
        });

        var err = null;
        try {
            await quizResult.validate();
        }
        catch (e) {
            err = e;
        }
       expect(err).to.not.exist;
    });

    // it('should calculate score from answers given for fully completed quiz', function (done) {
    //     expect(true).to.be.false;
    //     done();
    // });

    // it('should calculate score from answers given for partially completed quiz', function (done) {
    //     expect(true).to.be.false;
    //     done();
    // });
});