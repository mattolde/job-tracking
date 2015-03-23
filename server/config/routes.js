var auth = require('./auth'),
    users = require('../controllers/users'),
    jobs = require('../controllers/jobs');

module.exports = function(app){

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.userUpdate);

  app.get('/api/jobs', jobs.getJobs);
  app.get('/api/jobs/:id', jobs.getJobById);
  // app.post('/api/jobs', jobs.createJobs);
  // app.put('/api/jobs', jobs.updateJob);
  // app.delete('/api/jobs', jobs.deleteJob);

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res){
    req.logout();
    res.end();
  });

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};
