angular.module('app')

.controller('navBarLoginCtrl', ['$scope','$http','notifierSrv', 'identitySrv', 'authSrv', '$location', function($scope, $http, notifierSrv, identitySrv, authSrv, $location){

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

  $scope.signout = function() {
    authSrv.logoutUser().then(function(){
      $scope.username = '';
      $scope.password = '';
      notifierSrv.notify('Successfully logged out.');
      $location.path('/');
    });
  };

}]);
