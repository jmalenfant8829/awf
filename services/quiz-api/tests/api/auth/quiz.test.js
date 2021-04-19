const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require("../../../app");

chai.use(chaiHttp);

describe.only('Quiz tests', () => {
    describe('GET api/quiz/', function() {
        it('gets all quizzes', function(done) {
            chai.request(app)
                .get('/api/quiz')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
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
                const responseBody = res.body
                expect(responseBody.questions.length).to.equal(2)
                expect(responseBody.title).to.equal('New Test')
                done();
                });
        });
    });

    describe('PATCH api/quiz/:id', function() {
        it('updates a quiz', function(done) {
            chai.request(app)
                .get('/api/quiz')
                .end((err, res) => {
                    id = res.body[0]._id
                    var arg = ("/api/quiz/" + id)
                    chai.request(app)
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

                        })
                        .end((err, res) => {
                        expect(res).to.have.status(204);
                        done();
                        })
            });
        });
    });

    describe('DELETE api/quiz/:id', function() {
        it('deletes a quiz', function(done) {
            chai.request(app)
                .get('/api/quiz')
                .end((err, res) => {
                    id = res.body[0]._id
                    var arg = ("/api/quiz/" + id)
                    chai.request(app)
                        .delete(arg)
                        .end((err, res) => {
                        expect(res).to.have.status(204);
                        done();
                        })
            });
        });
    });

});