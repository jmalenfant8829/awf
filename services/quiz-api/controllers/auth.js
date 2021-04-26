
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require("../models/user");

function register(req, res) {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ success: false, msg: 'Please pass username, email, and password.' });
    }
    else {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.status(400).json({ success: false, msg: err.message });
            }
            res.json({ success: true, msg: 'Successfully created new user.' });
        });
    }
}

function login(req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toObject(), config['jwt-secret']);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed.' });
                }
            });
        }
    });
}

module.exports = { register, login };