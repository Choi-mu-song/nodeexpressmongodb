var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var async = require('async');

var index = require('./routes/index');
// var users = require('./routes/users');
var board = require('./routes/board');
var newPost = require('./routes/new');

var db = require('./config/db.js');
db();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // default false
	sourceMap: true,
	outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

require('./config/passport')(passport);

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

//bootstrap css
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
//jquery
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
//bootstrap js
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));


//route
app.use('/', index);
app.use('/login', index);
app.use('/profile', index);
app.use('/signup', index);
app.use('/account', index);

// app.use('/users', users);

app.use('/board', board);
app.use('/show', board);
app.use('/edit', board);

app.use('/new', newPost);

// app.use('/login', login);
// app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// app.listen(port);
module.exports = app;