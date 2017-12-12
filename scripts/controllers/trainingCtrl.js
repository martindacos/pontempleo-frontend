angular.module("project").controller("trainingCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    $scope.get = function () {
        swal('Cargando ...', '','')
        swal.showLoading();

        restService.get(restService.url, "courses/", '')
            .then(function (response) {
                $scope.courses = response.data;
                swal.close();
            }, function error(response) {
                $scope.courses = [];
            });
    };

    $scope.get();

    $scope.setCourse = function(name){
        //console.log(inscription);
        var myEl = angular.element( document.querySelector( '#title' ) );
        myEl.html(name);
    };
}]);

