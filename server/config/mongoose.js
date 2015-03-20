var mongoose = require('mongoose');

module.exports = function(config){

  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function() {
    console.log('jobs db opened');
  });


  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });

  var User = mongoose.model('User', userSchema);

  // Create some users if none are found
  User.find({}).exec(function(err, collection) {

    if(collection.length === 0){

      User.create({firstName: 'Nick', lastName: 'Dallas', userName: 'nDallas'});
      User.create({firstName: 'Kate', lastName: 'Bell', userName: 'kBell'});
      User.create({firstName: 'Sarah', lastName: 'Doc', userName: 'sDoc'});

    }

  });

};
