angular.module('app')

.controller('jobDetailsCtrl', ['$scope', 'jobSrv', '$routeParams', function($scope, jobSrv, $routeParams) {

  $scope.job = jobSrv.get({_id: $routeParams.id});

}]);
