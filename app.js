var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var linksRouter = require('./routes/links');
var branchesRouter = require('./routes/branches');
var positionsRouter = require('./routes/positions');
var catalogRouter = require('./routes/catalog');
var loginRouter = require('./routes/log-in');
var flowersRouter = require('./routes/flowers');
var flowerRouter = require('./routes/flower');
var forgotRouter = require('./routes/forgot');
var logoutRouter = require('./routes/logout');
var resetRouter = require('./routes/reset');
var userDataRouter = require('./routes/userData');
var userProfileRouter = require('./routes/userProfile');

const secret = "harry potter is not cool";

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: secret
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors());


var User = require('./model')("User");
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use(function (req,res,next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   req.header("Access-Control-Allow-Origin","*");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// })
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use('/', indexRouter);
app.use('/users', nocache, usersRouter);
app.use('/user', nocache, userRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/links', linksRouter);
app.use('/branches', branchesRouter);
app.use('/positions', positionsRouter);
app.use('/catalog', catalogRouter);
app.use('/flowers', flowersRouter);
app.use('/flower', flowerRouter);
app.use('/log-in', loginRouter);
app.use('/forgot', forgotRouter);
app.use('/logout', logoutRouter);
app.use('/reset', resetRouter);
app.use('/userData', userDataRouter);
app.use('/userProfile', userProfileRouter);

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;
