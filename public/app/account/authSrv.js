angular.module('app')

.factory('authSrv', ['$http', 'identitySrv', '$q', function($http, identitySrv, $q){

  return {

    authenticateUser: function(username, password){

      var dfd = $q.defer();

      $http.post('/login', {username: username, password: password})

        .then(function(res){

          if(res.data.success){

            identitySrv.currentUser = res.data.user;
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

    }

  };

}]);
