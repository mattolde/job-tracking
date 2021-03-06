angular.module('app')

.controller('signupCtrl', ['$scope', 'authSrv','notifierSrv', '$location', function($scope, authSrv, notifierSrv, $location){

  $scope.signup = function() {

    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    };

    authSrv.createUser(newUserData)
      .then(
        function(){
          notifierSrv.notify('Create new user account');
          $location.path('/');
        },
        function(reason){
          notifierSrv.error(reason);
        }
      );

  };

}]);
