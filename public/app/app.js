angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')

.config(function($routeProvider, $locationProvider){

  var routeRoleChecks = {
    admin: {
      auth: function(authSrv) {
        return authSrv.authorizeCurrentUserForRoute('admin');
      }
    }
  };

  $locationProvider.html5Mode(true);

  $routeProvider

    .when('/',
      {
        templateUrl: '/partials/main/main',
        controller: 'mainCtrl'
      }
    )
    .when('/admin/users',
      {
        templateUrl: '/partials/admin/user-list',
        controller: 'userListCtrl',
        resolve: routeRoleChecks.admin
      }
    )
    when('/signup',
      {
        templateUrl: '/partials/account/signup',
        controller: 'signupCtrl'
      }
    );

});


angular.module('app').run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {

    if(rejection === 'not authorized') {
      $location.path('/');
    }

  });
});
