angular.module("project").controller("trainingCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    $scope.get = function () {
        restService.get(restService.url, "courses/", '')
            .then(function (response) {
                $scope.courses = response.data;
            }, function error(response) {
                $scope.courses = [];
            });
    };

    $scope.get();

    $scope.setCourse = function(course){
        $scope.course = course;
    };

}]);

