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

var userSchema = new Schema({ //todo: add email validation
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
    // // quizzes user liked
    // likedQuizzes: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: "Quiz",
    //     }
    // ],
    quizScores: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "QuizResult",
        }
    ],
});

// encrypts password on save
userSchema.pre('save', function (next) {
    // generate password
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

// cascade save
// userSchema.pre('save', function (next) {
//     var user = this;

// });

// cascade delete
// userSchema.pre('remove', function(next) {
//     User.updateMany(
//         { quizScores : this._id},
//         { $pull: { quizScores: this._id } }
//     ).exec();

//     User.updateMany(
//         { createdQuizzes : this._id},
//         { $pull: { createdQuizzes: this._id } }
//     ).exec();
//     next();
// });

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


var User = mongoose.model('User', userSchema);
module.exports = User;
