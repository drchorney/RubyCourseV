(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .service('HTTPService',HTTPService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        ctrl: '<', // Note if using the '<' then in the DOM the hook is items
        // if you do items: '=menuItems' then the hook it menu-items
        title: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true

    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function () {
      // console.log("in empty")
      // console.log(list.items.loaded_flag)
      if (typeof list.ctrl.menu_items != "undefined") {
        if (list.ctrl.loaded_flag==0) {
          return false;
        } else if (list.ctrl.menu_items.length==0) {
          return true;
        }
      }
      return false;
    };
  }


  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {
    var controller = this;

    controller.title = "Search List"
    controller.loaded_flag = 0

    controller.getMenuItems = function (){
      var searchTerm = controller.searchTerm;

      controller.loaded_flag = 0;
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (response){
        controller.loaded_flag = 1;
      })
      controller.menu_items = MenuSearchService.getItems();
    };

    controller.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

  }; //End Controller

  MenuSearchService.$inject = ['HTTPService'];
  function MenuSearchService(HTTPService) {
    var service = this;
    var found = []; // this found array has watches intstantied when the service.getItems is called

    service.getMatchedMenuItems = function (searchTerm) {

      found = []
      var promise = HTTPService.http_request();

      promise.then(function (response) {
        var menu_items = response.data.menu_items;

        // console.log(response.data.menu_items)
      //  found = []
        for (var i = 0; i < menu_items.length; i++) {
          var description = menu_items[i].description;
          if ((description.toLowerCase().indexOf(searchTerm) !== -1) & searchTerm!='') {
            found.push(menu_items[i])
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })

    return promise;
    }

    service.getItems = function () {
      return found;
    };

    service.removeItem = function (itemIndex) {
      found.splice(itemIndex, 1);
    };

  }; //End Service

  HTTPService.$inject = ['$http', 'ApiBasePath'];
  function HTTPService($http, ApiBasePath) {
    var service = this;

    service.http_request = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;
    };
  }; // HTTP Service

})();
