(function () {
'use strict';

angular.module('public')
.component('infoEntry', {
  templateUrl: 'src/public/info/info.component.html',
  bindings: {
    user: '<'
  }
});

})();
