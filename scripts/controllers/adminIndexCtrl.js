angular.module("project").controller("adminIndexCtrl", ["$scope", "$http", "$rootScope", "$location", 'restService', 'postService', 'authService', function ($scope, $http, $rootScope, $location, restService, postService, authService) {

    $scope.route = function (route) {
        return route === $location.path();
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.close = function (viewLocation) {
        authService.ClearCredentials();
        $location.path("login");
    };

}]);