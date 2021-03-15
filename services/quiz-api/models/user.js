var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var validate = require('mongoose-validator');

var emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Invalid Email',
    }),
];

var UserSchema = new Schema({ //todo: add email validation
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: emailValidator,
    },
    password: {
        type: String,
        required: true
    },
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
});

// encrypts password on save
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


var User = mongoose.model('User', UserSchema);
module.exports = User;
