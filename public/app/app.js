angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){

  $routeProvider
    .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});

    $locationProvider.html5Mode(true);

});
