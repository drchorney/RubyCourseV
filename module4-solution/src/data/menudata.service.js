(function () {

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$q','$http','ApiBasePath'];
function MenuDataService($q,$http,ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    //https://davids-restaurant.herokuapp.com/categories.json
     var deferred = $q.defer();
     result =[];

      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });

      response.then(function (response) {
        result = response.data;
        deferred.resolve(result)
      })

    return deferred.promise;

  }//end method

  service.getItemsForCategory = function(categoryShortName){
    var deferred = $q.defer();
    result =[];

     var response = $http({
       method: "GET",
       url: (ApiBasePath + "/menu_items.json"),
       params: {
        category: categoryShortName
      }
     });

     response.then(function (response) {
       result = response.data.menu_items;
      //  console.log(result)
       deferred.resolve(result)
     })

   return deferred.promise;


  }//end method

}//end service


})();
