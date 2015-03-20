var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus');

module.exports = function(app, config) {

  // Setup view templates and jade as view engine
  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');

  // MIDDLEWARE
  // middleware function for stylus
  function compileStylus(str, path) {
    return stylus(str).set('filename', path);
  }

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  // app.use(bodyParser.json());
  app.use(stylus.middleware(
    {
      src: config.rootPath + '/public',
      compile: compileStylus
    }
  ));

  // Setup static file location for express will serve the file when requested.
  app.use(express.static(config.rootPath + '/public'));
};
