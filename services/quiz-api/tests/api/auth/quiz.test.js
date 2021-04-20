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

    describe('GET api/quiz/:id', function() {

        it('get one quiz', async () => {

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .get(('/api/quiz/' + testQuiz._id));
            expect(res).to.have.status(200);
        });
    });

    
    describe('GET api/quiz/:id', function() {

        it('search for invalid quiz id', async () => {

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .get('/api/quiz/1');
            expect(res).to.have.status(500);
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
            
            var arg = ("/api/quiz/" + testQuiz._id);
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
            var arg = ("/api/quiz/" + testQuiz._id);

            res = await chai.request(app)
                .delete(arg);
            expect(res).to.have.status(204);
        });
    });

    describe('GET api/quiz/:id/like', function() {
        it('Likes/unlikes a quiz', async() => {

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();
            
            var arg = ("/api/quiz/" + testQuiz._id + "/like");
            res = await chai.request(app)
                .get(arg)
            expect(res).to.have.status(204);
        });
    });

    describe('GET api/quiz/search', function() {
        it('Return quizzes that match search word', async() => {
            
            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();
            
            var arg = ("/api/quiz/search");
            res = await chai.request(app)
                .get(arg)
                .query({search: String(testQuiz.title)})
            expect(res.body[0]._id).to.equal(String(testQuiz._id));
        });
    });

});