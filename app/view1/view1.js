'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.view1Services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','view1Service', function($scope, view1Service) {
        $scope.items=[];
      $scope.beginSearch = function() {
          $scope.list = view1Service.get({q: $scope.searchTerm}, function (data) {
              $scope.items = data.items;
          });
      };
 }]);


angular.module('myApp.view1Services', ['ngResource'])
    .factory('view1Service', ['$resource',
    function($resource){
        var targetUrl = "https://api.github.com/search/repositories";  //?q=tetris";
        return $resource(targetUrl, {}, {
            query: {method:'GET',params:{}, isArray:false}
        });
    }]);



