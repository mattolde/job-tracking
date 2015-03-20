angular.module('app')

.factory('identitySrv', [function(){

  return {

    currentUser: undefined,

    isAuthenticated: function(){

      if(this.currentUser){
        return true;
      } else {
        return false;
      }

    }

  };

}]);
