angular.module('app').value('toastr', toastr);


angular.module('app')

.factory('notifierSrv',['toastr', function(toastr){

  return {

    notify: function(msg) {
      toastr.success(msg);
      console.log(msg);
    }

  };

}]);
