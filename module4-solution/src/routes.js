(function () {

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab 1 if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.template.html'
    })

    .state('categoriesState', {
      url: '/categories/',
      templateUrl: 'templates/categories.template.html',
      controller: 'CategoriesController as categories',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // Item detail
  .state('itemsState', {
    url: '/categories/{short_name}/items/',
    templateUrl: 'templates/items.template.html',
    controller: 'ItemsController as items',
    resolve: {
      items: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.short_name);//ItemsForCategory(categoryId);
      }]
    }
  })
}

})();
