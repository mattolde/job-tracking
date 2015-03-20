angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});

    $locationProvider.html5Mode(true);

});


angular.module('app').controller('mainCtrl', ['$scope', function($scope){

  $scope.myVar = 'Hello NG!!!';

}]);
