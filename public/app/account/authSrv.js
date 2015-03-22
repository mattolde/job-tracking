angular.module('app')

.factory('authSrv', ['$http', 'identitySrv', '$q', 'userSrv', function($http, identitySrv, $q, userSrv){

  return {

    authenticateUser: function(username, password){

      var dfd = $q.defer();

      $http.post('/login', {username: username, password: password})

        .then(function(res){

          if(res.data.success){

            var user = new userSrv();

            // extending user to have userSrv isAdmin
            angular.extend(user, res.data.user);

            identitySrv.currentUser = user;

            dfd.resolve(true);

          } else {

            dfd.resolve(false);

          }
        });

        return dfd.promise;
    },

    logoutUser: function() {

      var dfd = $q.defer();

      $http.post('/logout', {logout:true})
        .then(function(){
          identitySrv.currentUser = undefined;
          dfd.resolve();
        });

      return dfd.promise;

    },

    authorizeCurrentUserForRoute: function(role) {

      if(identitySrv.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }

    },

    createUser: function(userData) {

      var newUser = new userSrv(userData);
      var dfd = $q.defer();

      newUser.$save().then(function() {

        identitySrv.currentUser = newUser;
        dfd.resolve();

      }, function(response) {

        dfd.reject(response.data.reason);

      });

      return dfd.promise;

    }

  };

}]);
