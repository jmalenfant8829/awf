var expect = require('chai').expect;
var User = require("../../models/user");
const faker = require('faker');
var mongoose = require('mongoose');

describe("User Model", function() {

    //set up db for testing user model
    before(function() {
        mongoose.connect("mongodb://localhost:27017/awf-test-user-model",
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    });

    // clear db before each test run
    beforeEach((done) => {
        mongoose.connection.collections.users.drop(() => {
            done();
        }); 
    });

    //drop db after testing completed
    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });

    it('should be invalid if username is empty', function(done) {
        var user = new User({
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
        user.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    it('should be invalid if password is empty', function(done) {
        var user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
        });
        user.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should reject incorrect password', function(done) {
        var user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: "myTestPassword",
        });

        user.save(function(err) {
            user.comparePassword("wrongPassword", function(err, isMatch) {
                expect(err).to.be.null;
                expect(isMatch).to.be.false;
                done();
            });
        });
    });

    it('should accept correct password', function(done) {
        var user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: "myTestPassword",
        });
        user.save(function(err) {
            user.comparePassword("myTestPassword", function(err, isMatch) {
                expect(err).to.be.null;
                expect(isMatch).to.be.true;
                done();
            });
        });

    });

    it('should be invalid if email is empty', function(done) {
        var user = new User({
            username: faker.internet.userName(),
            password: faker.internet.password(),
        });
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if email is invalid', function(done) {
        var user = new User({
            username: faker.internet.userName(),
            email: "notarealemail",
            password: faker.internet.password(),
        });
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be valid if all fields are valid', function(done) {
        var user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
        user.validate(function(err) {
            expect(err).to.be.null;
            done();
        });
    });

});