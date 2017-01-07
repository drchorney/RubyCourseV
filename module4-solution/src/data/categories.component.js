(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'templates/categorieslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
