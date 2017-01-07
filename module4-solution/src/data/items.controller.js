(function () {

angular.module('data')
.controller('ItemsController', ItemsController);

// Version with resolving to 1 item based on $stateParams in route config
ItemsController.$inject = ['items'];
function ItemsController(items_) {
  var items = this;
  items.items = items_;
  console.log(items.items)
  //console.log(categories.items)
}

})();
