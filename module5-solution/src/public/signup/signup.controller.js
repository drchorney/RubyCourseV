(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var reg = this;
  var item;

  reg.completed = false;
  reg.submit_attempt = false;

  reg.submit = function (short_name) {
    if (!reg.completed) {
      MenuService.getItemForShortName(short_name).then(function (response){
        reg.submit_attempt = true;
        if (response !=undefined) {
           reg.completed = true;
           console.log(response)
           reg.user.name = response.name;
           reg.user.description = response.description;
           reg.user.price_small = response.price_small
           reg.user.price_large = response.price_large
           MenuService.addUser(reg.user)
        }
        // $scope.$digest();
      });
    }

  };
}


})();
