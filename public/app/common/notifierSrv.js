angular.module('app').value('toastr', toastr);


angular.module('app')

.factory('notifierSrv',['toastr', function(toastr){

  return {

    notify: function(msg) {
      console.log(msg);
      toastr.success(msg);
    },

    error: function(errorMsg) {
      console.log(errorMsg);
      toastr.error(errorMsg);
    }

  };

}]);
