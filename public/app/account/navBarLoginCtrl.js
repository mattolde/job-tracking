angular.module('app')

.controller('navBarLoginCtrl', ['$scope','$http','notifierSrv', 'identitySrv', 'authSrv', function($scope, $http, notifierSrv, identitySrv, authSrv){


  $scope.identity = identitySrv;

  $scope.signin = function(username, password){

    authSrv.authenticateUser(username, password)
      .then(function(success){

        if(success){
          notifierSrv.notify('Successfully logged in');
        } else {
          notifierSrv.notify("Username/Password incorrect");
        }

      });
  };

}]);
