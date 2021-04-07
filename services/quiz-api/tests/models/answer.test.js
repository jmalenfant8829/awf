var expect = require('chai').expect;
var Answer = require("../../models/answer");
const faker = require('faker');
const getTestUser = require("../../testUtils/schemaSamples").getTestUser;

describe("Answer Model", function () {

    var user;

    beforeEach(async () => {
        user = getTestUser();
    });

    it('should be invalid without answer description', function (done) {
        var answer = new Answer({
            isCorrect: true,
        });
        answer.validate(function (err) {
            expect(err.errors.description).to.exist;
            done();
        });
    });

    it('should be valid with valid description', function (done) {
        var answer = new Answer({
            description: faker.lorem.sentence(),
            isCorrect: true,
        });
        answer.validate(function (err) {
            expect(err).to.be.null;
            done();
        });
    });

    it('should have correctness default to false if not specified', function (done) {
        var answer = new Answer({
            description: faker.lorem.sentence(),
        });
        expect(answer.isCorrect).to.be.false;
        done();
    });

});