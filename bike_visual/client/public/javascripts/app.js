var bikeVisual = angular.module('bikeVisual', [])

bikeVisual.controller('bikeController', function($scope, $http) {

  $scope.BostonData = {};
  $scope.CambridgeData = {};


  // Get all data
  setInterval(function() {
    $http.get('/data')
      .success(function(data) {
        $scope.BostonData = data.filter(function(one) {return one.city == "Boston" });
        $scope.CambridgeData = data.filter(function(one) {return one.city == "Cambridge" });
      })
      .error(function(error) {
          console.log('Error: ' + error);
      });
    $scope.date = new Date();
  }, 1000);


  $scope.getTotal = function(city_data) {
    var total = 0;

    angular.forEach(city_data, function(each) {
      total += parseInt(each.count);
    });

    return total;
  }

  // $scope.$apply()
});