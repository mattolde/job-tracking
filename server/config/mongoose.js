var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

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
    username: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch){
      return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  };

  var User = mongoose.model('User', userSchema);

  // Create some users if none are found
  User.find({}).exec(function(err, collection) {

    if(collection.length === 0){

      var salt, hash;

      salt = encryption.createSalt();
      hash = encryption.hashPwd(salt, 'matto');
      User.create({firstName: 'Matt', lastName: 'Olde', username: 'matto', salt: salt, hashed_pwd: hash, roles: ['admin']});

      salt = encryption.createSalt();
      hash = encryption.hashPwd(salt, 'nDallas');
      User.create({firstName: 'Nick', lastName: 'Dallas', username: 'nDallas', salt: salt, hashed_pwd: hash, roles: []});

      salt = encryption.createSalt();
      hash = encryption.hashPwd(salt, 'kBell');
      User.create({firstName: 'Kate', lastName: 'Bell', username: 'kBell', salt: salt, hashed_pwd: hash, roles: []});

      salt = encryption.createSalt();
      hash = encryption.hashPwd(salt, 'sDoc');
      User.create({firstName: 'Sarah', lastName: 'Doc', username: 'sDoc', salt: salt, hashed_pwd: hash, roles: []});

    }

  });
};
