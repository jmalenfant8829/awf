const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require("../../../app");
const getTestUser = require("../../../testUtils/schemaSamples").getTestUser;

chai.use(chaiHttp);

describe('Quiz tests', () => {

    var testUser;

    beforeEach( async () => {
        testUser = await getTestUser();
    });

    describe('GET api/quiz/', function() {

        it('gets all quizzes', async () => {

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .get('/api/quiz');
            expect(res).to.have.status(200);
            expect(res.body[0]._id).to.equal(String(testQuiz._id));
        });
    });

    describe('POST api/quiz/', function() {
        it('creates a new quiz', function(done) {
            chai.request(app)
                .post('/api/quiz')
                .send({
                    "userId": "60651932e22ac562432fd57f",
                    "title": "New Test",
                    "questions": 
                      [
                          {
                              "description": "test question",
                              "answers": [{
                                      "description": "answer1",
                                      "isCorrect" : true}]
                           }, 
                          {
                              "description": "test question2",
                              "answers": [{
                                      "description": "answer1",
                                      "isCorrect" : true}]
                          }
                      ]
                  })
                .end((err, res) => {
                expect(res).to.have.status(200);
                const responseBody = res.body;
                expect(responseBody.questions.length).to.equal(2);
                expect(responseBody.title).to.equal('New Test');
                done();
                });
        });
    });

    describe('PATCH api/quiz/:id', function() {
        it('updates a quiz', async() => {

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .get('/api/quiz');

            id = res.body[0]._id;
            var arg = ("/api/quiz/" + id);

            res = await chai.request(app)
                .patch(arg)
                .send({"title": "New Test",
                "questions": 
                    [
                        {
                            "description": "test question",
                            "answers": [{
                                    "description": "answer1",
                                    "isCorrect" : true}]
                        }, 
                        {
                            "description": "test question2",
                            "answers": [{
                                    "description": "answer1",
                                    "isCorrect" : true}]
                        }
                    ]

                });
            expect(res).to.have.status(204);
        });
    });

    describe('DELETE api/quiz/:id', function() {

        it('deletes a quiz', async() => {

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .get('/api/quiz');
            id = res.body[0]._id;
            var arg = ("/api/quiz/" + id);

            res = await chai.request(app)
                .delete(arg);
            expect(res).to.have.status(204);
        });
    });

});