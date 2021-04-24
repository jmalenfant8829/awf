var authCtrl = require( '../controllers/auth');

var express = require('express');
var router = express.Router();

router.route('/register')
    .post(authCtrl.register);

router.route('/login')
    .post(authCtrl.login);

module.exports = router;