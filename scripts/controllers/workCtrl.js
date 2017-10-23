angular.module("project").controller("workCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    $('#myModal').modal('hide');

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

    $scope.setInscription = function(inscription){
        console.log(inscription);
    };

}]);

