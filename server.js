var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


// Setup view templates and jade as view engine

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');


// ROUTES

app.get('*', function(req, res) {
  res.render('index');
});


// Start server
var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
