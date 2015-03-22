var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getUsers = function(req, res) {

  User.find({}).exec(function(err, collection) {
    res.send(collection);
  });

};

exports.createUser = function(req, res, next) {

  var userData = req.body;

  userData.salt = encryption.createSalt();
  userData.hashed_pwd = encryption.hashPwd(userData.salt, userData.password);

  User.create(userData, function(err, user){

    if(err) {

      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }

      res.status(400);
      return res.send({reason: err.toString()});

    } else {

      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send(user);
      });
    }

  });

};
