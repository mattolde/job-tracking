var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
  company: {type: String, required:'{PATH} is required'},
  title: {type: String, required:'{PATH} is required'},
  description: String,
  open: {type: String, required:'{PATH} is required'},
  date: Date,
  skills: [String]
});

var Job = mongoose.model('Job', jobSchema);

function createDefaultJobs() {

  Job.find({}).exec(function(err, collection) {

    if(collection.length === 0) {

      Job.create({
        company: 'RXP',
        title: 'Front-end Developer',
        description: 'HTML and CSS',
        open: false,
        date: new Date('03/01/2015'),
        skills: ['HTML', 'CSS', 'Javascript']
      });

      Job.create({
        company: 'DiUS',
        title: 'Web Developer',
        description: 'Javascript, HTML and CSS',
        open: true,
        date: new Date('03/11/2015'),
        skills: ['HTML', 'CSS', 'Javascript', 'TDD', 'BDD']
      });

      Job.create({
        company: 'Forex',
        title: 'Web Architect',
        description: 'Convert legacy .NET to modern Javascript micro services',
        open: false,
        date: new Date('03/18/2015'),
        skills: ['HTML', 'CSS', 'Javascript', '.NET']
      });

    }

  });

}

exports.createDefaultJobs = createDefaultJobs;
