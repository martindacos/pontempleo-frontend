angular.module("project").controller("adminIndexCtrl", ["$scope",'$route', "$http", "$rootScope", "$location", 'restService', 'postService', 'authService', function ($scope,$route, $http, $rootScope, $location, restService, postService, authService) {

    $scope.route = function (route) {
        return route === $location.path();
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.close = function (viewLocation) {
        swal({
              title: '¿Estás seguro?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Cerrar Sesión'
            }).then(function () {
                authService.ClearCredentials();
                $location.path("login");
                $route.reload();
            })
    };

    $scope.resetCollapseNav = function(){
        $('.navbar-collapse').collapse('hide');
    };
}]);