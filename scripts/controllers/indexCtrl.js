angular.module("project").controller("indexCtrl", ["$scope", "$http", "$rootScope", "$location", 'restService', 'postService', function ($scope, $http, $rootScope, $location, restService, postService) {

    $('.button-collapse').sideNav();

    $scope.route = function (route) {
        return route === $location.path();
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

}]);