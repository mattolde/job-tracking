var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var secret = process.env.SECRET || 'devSecretStuff';

module.exports = {

  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost/jobs',
    port: process.env.PORT || 3030,
    secret: secret
  },
  producttion: {
    rootPath: rootPath,
    db: 'mongodb://' + process.env.MONGOLABS_USER + ':' + process.env.MONGOLABS_USER_PASS + '.mongolab.com:35240/jobs',
    port: process.env.PORT || 80,
    secret: secret
  }

};
