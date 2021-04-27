const chai = require('chai');
var expect = require('chai').expect;
const chaiHttp = require('chai-http');
const chaiAsPromised = require("chai-as-promised");
var app = require("../../../app");
var QuizResult = require("../../../models/quizResult");
const getTestUser = require("../../../testUtils/schemaSamples").getTestUser;

chai.use(chaiHttp);
chai.use(chaiAsPromised);


describe("Quiz Result Route", function () {

    var testUser;

    beforeEach((done) => {
        testUser = getTestUser();
        done();
    });

    it('should create quizresult for quiz with no existing quizresult', async () => {
        const preSavePassword = testUser.password;
        await testUser.save();
        res = await chai.request(app)
            .post('/api/auth/login')
            .send({ 'username': testUser.username, 'password': preSavePassword, });
        const jwtToken = res.body.token;
        await testUser.createdQuizzes[0].save();

        const question1 = user.createdQuizzes[0].questions[0];
        const question2 = user.createdQuizzes[0].questions[1];
        
        const selectedAnswers = {
            selectedAnswers: [
                question1.answers[0]._id,
                question2.answers[1]._id,
            ],
        };

        res = await chai.request(app)
            .put("/api/quiz/" + testUser.createdQuizzes[0]._id  + "/result/" + testUser.username)
            .set({ Authorization: jwtToken })
            .send(selectedAnswers);

        expect(res.status).to.equal(200);
        const addedQuizRes = await QuizResult.findOne({'userId': testUser.id});
        expect(addedQuizRes).to.not.be.null;
        expect(res.body.score).to.equal(1/2);
    });

    it('should update existing quizresult', async () => {
        const preSavePassword = testUser.password;
        await testUser.save();
        res = await chai.request(app)
            .post('/api/auth/login')
            .send({ 'username': testUser.username, 'password': preSavePassword, });
        const jwtToken = res.body.token;
        await testUser.createdQuizzes[0].save();

        const question1 = user.createdQuizzes[0].questions[0];
        const question2 = user.createdQuizzes[0].questions[1];
        
        const selectedAnswers = {
            selectedAnswers: [
                question1.answers[0]._id,
                question2.answers[1]._id,
            ],
        };

        res = await chai.request(app)
            .put("/api/quiz/" + testUser.createdQuizzes[0]._id  + "/result/" + testUser.username)
            .set({ Authorization: jwtToken })
            .send(selectedAnswers);

        expect(res.body.score).to.equal(0.5);

        // update with new answers
        const newAnswers = {
            selectedAnswers: [
                question1.answers[0]._id,
                question2.answers[0]._id,
            ],
        };

        res = await chai.request(app)
            .put("/api/quiz/" + testUser.createdQuizzes[0]._id  + "/result/" + testUser.username)
            .set({ Authorization: jwtToken })
            .send(newAnswers);

        expect(res.status).to.equal(200);
        const addedQuizRes = await QuizResult.findOne({'userId': testUser.id});
        expect(addedQuizRes).to.not.be.null;
        expect(res.body.score).to.equal(1);
    });

    it('should get quizresult', async () => {
        const preSavePassword = testUser.password;
        await testUser.save();
        res = await chai.request(app)
            .post('/api/auth/login')
            .send({ 'username': testUser.username, 'password': preSavePassword, });
        const jwtToken = res.body.token;
        await testUser.createdQuizzes[0].save();

        const question1 = user.createdQuizzes[0].questions[0];
        const question2 = user.createdQuizzes[0].questions[1];
        
        const selectedAnswers = {
            selectedAnswers: [
                question1.answers[0]._id,
                question2.answers[1]._id,
            ],
        };

        res = await chai.request(app)
            .put("/api/quiz/" + testUser.createdQuizzes[0]._id  + "/result/" + testUser.username)
            .set({ Authorization: jwtToken })
            .send(selectedAnswers);

        res = await chai.request(app)
            .get("/api/quiz/" + testUser.createdQuizzes[0]._id  + "/result/" + testUser.username);

        expect(res.status).to.equal(200);
        expect(res.body.selectedAnswers[0]).to.equal(String(question1.answers[0]._id));
        expect(res.body.score).to.equal(1/2);
    });

});