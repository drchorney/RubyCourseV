(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'templates/itemslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
