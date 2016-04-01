'use strict';

angular.module('myApp.view3', ['ngRoute', 'myApp.view3Services'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view3', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
      }).when('/view3/:repologin/:reponame', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
      });
    }])

    .controller('View3Ctrl', ['$scope','$routeParams','view3Service', function($scope,$routeParams, view3Service) {
      $scope.items=[];

      $scope.$on('$routeChangeSuccess', function() {
        $scope.repoowner=$routeParams.repologin;
        $scope.reponame=$routeParams.reponame;

        $scope.beginSearch = function() {
          $scope.list = view3Service.get({owner:$scope.repoowner,repo:$scope.reponame}, function (data) {
            $scope.data = data[0].url;
          });
        };

        $scope.beginSearch();
      });

    }]);


angular.module('myApp.view3Services', ['ngResource'])
    .factory('view3Service', ['$resource',
      function($resource){
        var targetUrl = "https://api.github.com/repos/:owner/:repo/commits";
        return $resource(targetUrl, {}, {
          query: {method:'GET',params:{}, isArray:true}
        });
      }]);



