const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const faker = require('faker');
const getTestUser = require("../../../testUtils/schemaSamples").getTestUser;
const app = require("../../../app");

chai.use(chaiHttp);

describe("Login Route", function () {

    var testUser;

    beforeEach((done) => {
        testUser = getTestUser();
        done();
    });

    it('should log in given valid credentials', async () => {
        const login = {
            username: testUser.username,
            password: testUser.password,
        };

        await testUser.save();

        chai.request(app)
            .post("/api/auth/login")
            .send(login)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                expect(res.body.token).to.exist;
            });
    });

    it('should not log in given invalid password', async () => {
        const login = {
            username: testUser.username,
            password: faker.internet.password(),
        };

        await testUser.save();

        chai.request(app)
            .post("/api/auth/login")
            .send(login)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.success).to.be.false;
            });
    });

    it('should not log in given nonexistent username', async () => {
        const login = {
            username: faker.internet.userName(),
            password: testUser.password,
        };

        await testUser.save();

        chai.request(app)
            .post("/api/auth/login")
            .send(login)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.success).to.be.false;
            });
    });

    it('should not log in without username', async () => {
        const login = {
            password: testUser.password,
        };

        await testUser.save();

        chai.request(app)
            .post("/api/auth/login")
            .send(login)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.success).to.be.false;
            });
    });

    it('should not log in without password', async () => {
        const login = {
            username: testUser.username,
        };

        await testUser.save();

        chai.request(app)
            .post("/api/auth/login")
            .send(login)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body.success).to.be.false;
            });
    });

});