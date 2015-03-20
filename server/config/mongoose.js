var mongoose = require('mongoose'),
    crypto = require('crypto');

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
    userName: String,
    salt: String,
    hashed_pwd: String
  });

  userSchema.methods = {
    authenticate: function(passwordToMatch){
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  };

  var User = mongoose.model('User', userSchema);

  // Create some users if none are found
  User.find({}).exec(function(err, collection) {

    if(collection.length === 0){

      var salt, hash;

      salt = createSalt();
      hash = hashPwd(salt, 'nDallas');
      User.create({firstName: 'Nick', lastName: 'Dallas', userName: 'nDallas', salt: salt, hashed_pwd: hash});

      salt = createSalt();
      hash = hashPwd(salt, 'kBell');
      User.create({firstName: 'Kate', lastName: 'Bell', userName: 'kBell', salt: salt, hashed_pwd: hash});

      salt = createSalt();
      hash = hashPwd(salt, 'sDoc');
      User.create({firstName: 'Sarah', lastName: 'Doc', userName: 'sDoc', salt: salt, hashed_pwd: hash});

    }

  });
};


function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {

  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');

}
