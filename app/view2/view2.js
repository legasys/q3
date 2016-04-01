'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.view2Services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        }).when('/view2/:repologin/:reponame', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope','$routeParams','view2Service', function($scope,$routeParams, view2Service) {
        $scope.items=[];

        $scope.$on('$routeChangeSuccess', function() {
            $scope.repoowner=$routeParams.repologin;
            $scope.reponame=$routeParams.reponame;

            $scope.beginSearch = function() {
                $scope.list = view2Service.get({owner:$scope.repoowner,repo:$scope.reponame}, function (data) {
                    $scope.data = data;
                });
            };

            $scope.beginSearch();
        });


    }]);


angular.module('myApp.view2Services', ['ngResource'])
    .factory('view2Service', ['$resource',
        function($resource){
            var targetUrl = "https://api.github.com/repos/:owner/:repo";
            return $resource(targetUrl, {}, {
                query: {method:'GET',params:{}, isArray:false}
            });
        }]);



