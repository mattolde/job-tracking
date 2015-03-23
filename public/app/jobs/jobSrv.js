angular.module('app')

.factory('jobSrv', ['$resource', function($resource) {

  var JobResource = $resource('/api/jobs/:_id', {_id: '@id'}, {
    update: {method:'PUT', isArray:false}
  });

  return JobResource;

}]);
