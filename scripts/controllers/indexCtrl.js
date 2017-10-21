angular.module("project").controller("indexCtrl", ["$scope", "$http", "$rootScope", "$location", 'restService', 'postService', function ($scope, $http, $rootScope, $location, restService, postService) {

    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();


    $scope.route = function (route) {
        return route === $location.path();
    };

}]);