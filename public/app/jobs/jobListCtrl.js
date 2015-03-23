angular.module('app')

.controller('jobListCtrl',['$scope', 'jobSrv', function($scope, jobSrv) {
  $scope.jobs = jobSrv.query();

  $scope.sortOptions = [
    {
      value: 'title',
      text: 'Sort by Title'
    },
    {
      value: 'company',
      text: 'Sort by Company'
    },
    {
      value: 'date',
      text: 'Sort by Date'
    }
  ];

  $scope.sortOrder = $scope.sortOptions[0].value;

}]);
