var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var datadateRouter = require('./routes/datadate');
var mapsRouter = require('./routes/maps');

// connection mongoose
var mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/cmsdb', {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
.then(()=>{console.log('')})
.catch(()=>{console.log('')});
// mongoose.connect('mongodb://localhost/CMS', {useNewUrlParser: true});

//bcrypt passwor
const bcrypt = require('bcrypt');
const saltRounds = 10;

var app = express();
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/data', dataRouter);
app.use('/api/datadate', datadateRouter);
app.use('/api/maps', mapsRouter);

module.exports = app;
