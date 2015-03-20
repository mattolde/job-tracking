var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


// Setup view templates and jade as view engine

app.set('views', __dirname + '/server/views');
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
    src: __dirname + '/public',
    compile: compileStylus
  }
));

// Setup static file location for express will serve the file when requested.
app.use(express.static(__dirname + '/public'));


// Mongo setup

if(env === 'development') {
  mongoose.connect('mongodb://localhost/jobs');
} else {
  mongoose.connect('mongodb://' + process.env.MONGOLABS_USER + ':' + process.env.MONGOLABS_USER_PASS + '.mongolab.com:35240/jobs');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function() {
  console.log('jobs db opened');
});


app.get('/partials/*', function(req, res) {
  res.render('../../public/app/' + req.params[0]);
});


// ROUTES

app.get('*', function(req, res) {
  res.render('index');
});


// Start server
var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
