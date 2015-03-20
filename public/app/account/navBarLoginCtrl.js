angular.module('app')

.controller('navBarLoginCtrl', ['$scope', function($scope){

  $scope.signin = function(username, password){
    console.log('Login here');
  };

}]);
