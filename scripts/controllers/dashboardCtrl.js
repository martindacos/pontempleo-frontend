angular.module("project").controller("dashboardCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    //Activate modals
    $('.modal').modal();
    $('select').material_select();


    $scope.loading = false;
    $scope.source = "DB";
    $scope.get = function () {
        restService.get(restService.url, "offers/", '')
            .then(function (response) {
                $scope.offers = response.data;
            }, function error(response) {
                $scope.offers = [];
            });
    };

    $scope.get();

    $scope.setOffer = function(offer){
        $scope.offer = offer;
    };

}]);

