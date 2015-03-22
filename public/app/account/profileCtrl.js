angular.module('app')

.controller('profileCtrl', ['$scope', 'authSrv', 'identitySrv', 'notifierSrv', function($scope, authSrv, identitySrv, notifierSrv){

  $scope.email = identitySrv.currentUser.username;
  $scope.firstName = identitySrv.currentUser.firstName;
  $scope.lastName = identitySrv.currentUser.lastName;

  $scope.update = function() {

    var userData = {
      username: $scope.email,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    };

    if($scope.password && $scope.password.length > 0) {
      userData.password = $scope.password;
    }

    authSrv.updateCurrentUser(userData).then(function() {
      notifierSrv.notify('Your account has been updated');
    }, function(reason) {
      notifierSrv.error(reason);
    });

  };

}]);
