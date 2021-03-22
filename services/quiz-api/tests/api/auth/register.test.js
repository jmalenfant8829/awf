const chai = require('chai');
var expect = require('chai').expect;
const chaiHttp = require('chai-http');
const faker = require('faker');
var app = require("../../../app");

chai.use(chaiHttp);

describe("Registration Route", function () {

    it('should register given valid details', (done) => {
        var user = {
            username: "user1",
            password: "password1",
            email: "user@user.com",
        };

        chai.request(app)
            .post("/api/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            });
    });

    it('should fail to register given no username', (done) => {
        var user = {
            password: "password1",
            email: "user@user.com",
        };

        chai.request(app)
            .post("/api/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                done();
            });
    });

    it('should fail to register given no password', (done) => {
        var user = {
            username: "user1",
            email: "user@user.com",
        };

        chai.request(app)
            .post("/api/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                done();
            });
    });

    it('should fail to register given no email', (done) => {
        var user = {
            username: "user1",
            password: "password1",
        };

        chai.request(app)
            .post("/api/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                done();
            });
    });

    it('should fail to register given invalid email', (done) => {
        var user = {
            username: "user1",
            email: "invalidEmail",
            password: "password1",
        };

        chai.request(app)
            .post("/api/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.success).to.be.false;
                done();
            });
    });

});