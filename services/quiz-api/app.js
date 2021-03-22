console.log(require('dotenv').config());
require('cache-require-paths');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var dbConfig = require('./config/database');

//set mongodb connection
mongoose.connect(dbConfig.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(cors());
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//define routes
var authApi = require('./routes/auth');
app.use('/api/auth', authApi);

module.exports = app;
