(function () {
'use strict'

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var buyAddr = this;

  buyAddr.items = ShoppingListCheckOffService.getToBuyItems();
  buyAddr.buyItem = function(index) {
    ShoppingListCheckOffService.buyItem(index);

  }

  // buyAddr.empty = function() {
  //   // if buyAddr.items.length == 0 {
  //   //   return true;
  //   // }
  //   blah = buyAddr.items.length
  //   if blah ==0 {
  //     return true
  //   }
  // };

};


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var boughtAddr = this;

  boughtAddr.items = ShoppingListCheckOffService.getBoughtItems();

  // boughtAddr.check_full = function() {
  //   ShoppingListCheckOffService.check_full();
  // }

};


 function ShoppingListCheckOffService() {

  var service = this;

  var bought_items = [];
  var tobuy_items = [
    { name: "cookies", quantity: 10},
    { name: "cookies", quantity: 12},
    { name: "blah", quantity: 13},
    { name: "pop", quantity: 15},
    { name: "popcicles", quantity: 11}
  ];

  var init_buy_length = tobuy_items.length

  service.buyItem = function (index) {
    bought_items.push(tobuy_items[index])
    tobuy_items.splice(index,1);
  };

  service.getBoughtItems = function () {
    return bought_items;
  };

  service.getToBuyItems = function () {
    return tobuy_items;
  };

  service.check_full = function () {
    if (init_buy_length==bought_items.length) {
      return true;
    } else {
      return false;
    }
  }


};

})();
