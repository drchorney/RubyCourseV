(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath','$q'];
function MenuService($http, ApiPath,$q) {
  var service = this;

  var info_list=[];

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      console.log(response.data)
      return response.data;
    });
  };

  service.getItemForShortName = function(ShortName){
    var deferred = $q.defer();
    var result;
    var i;

     var response = $http({
       method: "GET",
       url: (ApiPath + "/menu_items.json"),
     });

     response.then(function (response) {
      //  console.log(response.data.menu_items[0].short_name)
       for (i = 0; i < response.data.menu_items.length; i++) {
        //  console.log(response.data.menu_items[i].short_name);
         if (response.data.menu_items[i].short_name == ShortName) {
           var result = response.data.menu_items[i]
           break;
         }
       }
       deferred.resolve(result)
     })

   return deferred.promise;
 }

 service.addUser = function(user) {
   info_list = []
   info_list.push(user)
 }

 service.getUser = function() {
   return info_list[0]
 }


}



})();
