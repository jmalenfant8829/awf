const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require("../../../app");
const getTestUser = require("../../../testUtils/schemaSamples").getTestUser;
const Quiz = require('../../../models/quiz');

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
            expect(res).to.have.status(400);
        });
    });
    
    describe('POST api/quiz/', function() {

        it('creates a new quiz', async () => {
            const preSavePassword = testUser.password;
            await testUser.save();
            res = await chai.request(app)
                .post('/api/auth/login')
                .send({ 'username': testUser.username, 'password': preSavePassword, });
            const jwtToken = res.body.token;

            res = await chai.request(app)
                .post('/api/quiz')
                .set({ Authorization: jwtToken })
                .send({
                    "userId": testUser.id, //arbitrary object id
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
                  });

            expect(res).to.have.status(200);
            const responseBody = res.body;
            expect(responseBody.questions.length).to.equal(2);
            expect(responseBody.title).to.equal('New Test');
        });
        

        it('does not create new quiz given no user id', async () => {

            const preSavePassword = testUser.password;
            await testUser.save();
            res = await chai.request(app)
                .post('/api/auth/login')
                .send({ 'username': testUser.username, 'password': preSavePassword, });
            const jwtToken = res.body.token;

            res = await chai.request(app)
            .post('/api/quiz')
            .set({ Authorization: jwtToken })
            .send({
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
            });
            expect(res).to.have.status(403);
        });
    });
    

 
    describe('PATCH api/quiz/:id', function() {
        it('updates a quiz', async() => {

            const preSavePassword = testUser.password;
            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .post('/api/auth/login')
                .send({ 'username': testUser.username, 'password': preSavePassword, });
            const jwtToken = res.body.token;
            
            var arg = ("/api/quiz/" + testQuiz._id);
            res = await chai.request(app)
                .patch(arg)
                .set({ Authorization: jwtToken })
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

            const preSavePassword = testUser.password;
            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .post('/api/auth/login')
                .send({ 'username': testUser.username, 'password': preSavePassword, });
            const jwtToken = res.body.token;

            var arg = ("/api/quiz/" + testQuiz._id);

            res = await chai.request(app)
                .delete(arg)
                .set({ Authorization: jwtToken });

            expect(res).to.have.status(204);
        });
    });

    describe('POST api/quiz/:id/like', function() {
        it('Likes a quiz', async() => {

            const preSavePassword = testUser.password;

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .post('/api/auth/login')
                .send({ 'username': testUser.username, 'password': preSavePassword, });
            const jwtToken = res.body.token;
            
            res = await chai.request(app)
                .post("/api/quiz/" + testQuiz._id + "/like")
                .set({ Authorization: jwtToken })
                .send({
                    userId: testUser.id,
                });
            expect(res).to.have.status(204);
            likedQuiz = await Quiz.findById(testQuiz.id);
            expect(likedQuiz.likers).to.include(testUser.id);
        });
    });

    describe('POST api/quiz/:id/like', function() {
        it('Unlikes a liked quiz', async() => {

            const preSavePassword = testUser.password;

            await testUser.save();
            testQuiz = testUser.createdQuizzes[0];
            await testQuiz.save();

            res = await chai.request(app)
                .post('/api/auth/login')
                .send({ 'username': testUser.username, 'password': preSavePassword, });
            const jwtToken = res.body.token;
            
            res = await chai.request(app)
                .post("/api/quiz/" + testQuiz._id + "/like")
                .set({ Authorization: jwtToken })
                .send({
                    userId: testUser.id,
                });
            expect(res).to.have.status(204);
            likedQuiz = await Quiz.findById(testQuiz.id);
            expect(likedQuiz.likers).to.include(testUser.id);

            // toggle the like
            res = await chai.request(app)
                .post("/api/quiz/" + testQuiz._id + "/like")
                .set({ Authorization: jwtToken })
                .send({
                    userId: testUser.id,
                });
            expect(res).to.have.status(204);
            likedQuiz = await Quiz.findById(testQuiz.id);
            expect(likedQuiz.likers).to.not.include(testUser.id);
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