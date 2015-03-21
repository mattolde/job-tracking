var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {

  // Setup view templates and jade as view engine
  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');

  // MIDDLEWARE
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({secret:config.secret,resave:false,saveUninitialized:false}));
  app.use(passport.initialize());
  app.use(passport.session());

  // middleware function for stylus
  function compileStylus(str, path) {
    return stylus(str).set('filename', path);
  }

  app.use(stylus.middleware(
    {
      src: config.rootPath + '/public',
      compile: compileStylus
    }
  ));

  // Setup static file location
  app.use(express.static(config.rootPath + '/public'));
};
