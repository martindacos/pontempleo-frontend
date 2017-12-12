angular.module("project").controller("indexCtrl", ["$scope", "$http", "$rootScope", "$location", 'restService', 'postService', 'authService', function ($scope, $http, $rootScope, $location, restService, postService, authService) {

    $scope.route = function (route) {
        return route === $location.path();
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.showNax = function () {
        return authService.showAdminNav($location.path());
    }

    $scope.showRestaurant = function () {
        return authService.isRestaurant($location.path());
    }

    $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });
}]);