var Job = require('mongoose').model('Job');

exports.getJobs = function(req, res) {
  Job.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getJobById = function(req, res) {
  Job.findOne({_id:req.params.id}).exec(function(err, job) {
    res.send(job);
  });
};
