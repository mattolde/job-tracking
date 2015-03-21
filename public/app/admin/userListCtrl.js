angular.module('app')

.controller('userListCtrl', ['$scope', 'userSrv',  function($scope, userSrv) {

  $scope.users = userSrv.query();

}]);
