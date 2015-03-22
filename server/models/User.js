var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: {type:String, required: '{PATH} us required!'},
  lastName: {type:String, required: '{PATH} us required!'},
  username: {type:String, required: '{PATH} us required!', unique: true},
  salt: {type:String, required: '{PATH} us required!'},
  hashed_pwd: {type:String, required: '{PATH} us required!'},
  roles: [String]
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf('admin') > -1;
  }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {

  User.find({}).exec(function(err, collection) {

    if(collection.length === 0){

      var salt, hash;

      salt = encryption.createSalt();
      hash = encryption.hashPwd(salt, 'matt@gmail.com');
      User.create({firstName: 'Matt', lastName: 'Olde', username: 'matt@gmail.com', salt: salt, hashed_pwd: hash, roles: ['admin']});

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

}

exports.createDefaultUsers = createDefaultUsers;
