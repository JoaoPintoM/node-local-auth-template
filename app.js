/*
  Author : Joao Pinto
   - pinto.joao@outlook.com

  based on the work of phildow from OK CODERS
      -> https://github.com/okcoders
*/

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// suppa cool middleware to provide usefull information to the user
var flash = require('connect-flash');


// Identification with passport middleware
var passport = require('passport');
var User = require('./models/user');


// "template" is my database name
// feel free to change it if you want to use your own database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/template');

var routes = require('./routes/index');

//views routes
var secrets = require('./routes/secrets')
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({secret: 'secret', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));

/*
    PASSPORT AUTH
    -------------
*/
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    console.log('dude: '+ user); 
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


// flash middleware config
//      + passport isAuth to view.
app.use(flash());
app.use(function(req, res, next) {
  res.locals.message = req.flash();

  //AS WE are already creating this simple Middleware for flash messages
  //We can use this place to get if user is auth (passport.js)
  res.locals.login = req.isAuthenticated();
  next();
});

app.use(express.static(path.join(__dirname, 'public')));


/*
    ROUTES SECTION
    --------------
*/

//base Route
app.use('/', routes);

//View Routes
app.use('/users', users);
app.use('/secrets', secrets);


/*
    Error Handlers
    --------------
*/

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
