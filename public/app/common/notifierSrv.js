angular.module('app').value('toastr', toastr);


angular.module('app')

.factory('notifierSrv',['toastr', function(toastr){

  return {

    notify: function(msg) {
      toastr.success(msg);
    },

    error: function(errorMsg) {
      toastr.error(msg);
    }

  };

}]);
