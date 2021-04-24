const chai = require('chai');
var expect = require('chai').expect;
const chaiHttp = require('chai-http');
const chaiAsPromised = require("chai-as-promised");
const faker = require('faker');
var app = require("../../../app");
var User = require("../../../models/user");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe("Registration Route", function () {

    it('should register given valid details', async () => {
        var user = {
            username: "user1",
            password: "password1",
            email: "user@user.com",
        };

        res = await chai.request(app)
            .post("/api/auth/register")
            .send(user);

        expect(User.findOne({ username: user.username })).to.be.fulfilled;
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
    });

    it('should fail to register given no username', async () => {
        var user = {
            password: "password1",
            email: "user@user.com",
        };

        res = await chai.request(app)
            .post("/api/auth/register")
            .send(user);

        expect(User.findOne({ username: user.username })).to.be.rejectedWith(Error);
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.false;
    });

    it('should fail to register given no password', async () => {
        var user = {
            username: "user1",
            email: "user@user.com",
        };

        res = await chai.request(app)
            .post("/api/auth/register")
            .send(user);

        expect(User.findOne({ username: user.username })).to.be.rejectedWith(Error);
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.false;
    });

    it('should fail to register given no email', async () => {
        var user = {
            username: "user1",
            password: "password1",
        };

        res = await chai.request(app)
            .post("/api/auth/register")
            .send(user);

        expect(User.findOne({ username: user.username })).to.be.rejectedWith(Error);
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.false;
    });

    it('should fail to register given invalid email', async () => {
        var user = {
            username: "user1",
            email: "invalidEmail",
            password: "password1",
        };

        res = await chai.request(app)
            .post("/api/auth/register")
            .send(user);

        expect(User.findOne({ username: user.username })).to.be.rejectedWith(Error);
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.false;
    });

});