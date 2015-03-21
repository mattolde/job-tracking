angular.module('app')

.factory('identitySrv', ['$window', 'userSrv', function($window, userSrv){

  var currentUser;

  if($window.bootstrappedUserObject) {
    currentUser = new userSrv();

    angular.extend(currentUser, $window.bootstrappedUserObject);
  }

  return {

    currentUser: currentUser,

    isAuthenticated: function(){
      return !!this.currentUser;
    }

  };

}]);
