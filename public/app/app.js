angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')

.config(function($routeProvider, $locationProvider){

  var routeRoleChecks = {
    admin: {
      auth: function(authSrv) {
        return authSrv.authorizeCurrentUserForRoute('admin');
      }
    },
    user: {
      user: function(authSrv) {
        return authSrv.authorizeAuthenticatedUserForRoute();
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
    .when('/profile',
      {
        templateUrl: '/partials/account/profile',
        controller: 'profileCtrl',
        resolve: routeRoleChecks.user
      }
    )
    .when('/signup',
      {
        templateUrl: '/partials/account/signup',
        controller: 'signupCtrl'
      }
    )
    .when('/jobs',
      {
        templateUrl: '/partials/jobs/job-list',
        controller: 'jobListCtrl',
        resolve: routeRoleChecks.user
      }
    )
    .when('/jobs/:id',
      {
        templateUrl: '/partials/jobs/job-details',
        controller: 'jobDetailsCtrl',
        resolve: routeRoleChecks.user
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
