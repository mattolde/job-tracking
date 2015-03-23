var Job = require('mongoose').model('Job');

exports.getJobs = function(req, res) {
  Job.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};
