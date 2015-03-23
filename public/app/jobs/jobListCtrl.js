angular.module('app')

.controller('jobListCtrl',['$scope', 'jobSrv', function($scope, jobSrv) {
  $scope.jobs = jobSrv.query();
}]);
