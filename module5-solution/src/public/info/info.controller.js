(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['MenuService','ApiPath'];
function InfoController(MenuService,ApiPath) {
  var infoCtrl = this;


  infoCtrl.getUser = function() {
      var user = MenuService.getUser()

      if (user) {
        // infoCtrl.username = user.username;
        // infoCtrl.email = user.email;
        // infoCtrl.phone = user.phone;
        // infoCtrl.short_name = user.short_name;
        infoCtrl.user = user;
        infoCtrl.user.basePath = ApiPath;
        return true;
      } else {
        return false;
      }

  }

  infoCtrl.getMenuDetails = function() {
    MenuService.getItemForShortName(user.short_name).then( function (response){
      console.log(response)
    })
  }

}


})();
