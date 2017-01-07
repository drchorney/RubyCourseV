(function () {

angular.module('data')
.controller('CategoriesController', CategoriesController)

CategoriesController.$inject = ['items'];
function CategoriesController(items) {
  var categories = this;
  categories.items = items;

  // MenuDataService.getAllCategories()
  // .then(function (result) {
  //   categories.items = result;
  // });
}

})()
