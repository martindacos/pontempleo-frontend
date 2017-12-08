angular.module("project").controller("alergenosCtrl", ["$scope", "$route", "$http", "$location", 'restService', 'postService', function ($scope, $route, $http, $location, restService, postService) {

$scope.url = restService.url;

$scope.alergenos = function () {
     $scope.aleID = $route.current.params.id;

     restService.get(restService.url, "alergenos/" + $scope.aleID, "")
            .then(function (response) {
                $scope.ale = response.data;
            }, function error(response) {
                $scope.ale = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

$scope.infoR = function () {

     restService.get(restService.url, "infoR/" + $scope.aleID, "")
            .then(function (response) {
                $scope.r = response.data;
            }, function error(response) {
                $scope.r = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

$scope.alergenos();
$scope.infoR();

}]);