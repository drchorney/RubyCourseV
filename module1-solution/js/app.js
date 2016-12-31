(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.list = "list comma separated dishes you usually have for lunch";
  $scope.message = '';

  //local method to parse the data
  function parse_data(list_) {
    var arr = list_.split(',');
    //console.log(arr)
    return arr
  };

  //local method to check lenght of an array and response
  function check_data(arr) {
    var num_elem = arr.length;

    if (num_elem <= 3) {
      return "Enjoy!";
    } else if (num_elem > 3) {
      return "Too Much!";
    } else {
      return ''
    }
  };

  //update the index.html when the button is pushed
  $scope.update_stuff = function () {
    if ($scope.list == '') {
      $scope.message = "Please enter data first";
    } else if ($scope.list == "list comma separated dishes you usually have for lunch") {
      $scope.message = "Please list comma separated dishes you usually have for lunch";
    } else {
     $scope.message = check_data(parse_data($scope.list));
    }
  };
};

})();
