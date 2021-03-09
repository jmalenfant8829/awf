// user model

const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    crypto = require('crypto'),
    jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        hash: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        // quizzes user created
        createdQuizzes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Quiz",
            }
        ],
        // quizzes user liked
        likedQuizzes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Quiz",
            }
        ],
    }
);

UsersSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        username: this.username,
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
};

UsersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        username: this.username,
        token: this.generateJWT(),
    };
};

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);