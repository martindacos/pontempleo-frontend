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
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

    $scope.get();

    $scope.setOffer = function(offer){
        $scope.offer = offer;
    };

    $scope.setInscription = function(name, inscription){
        console.log(inscription);
        var myEl = angular.element( document.querySelector( '#title' ) );
        myEl.html(name);
    };

    $scope.resetOffer = function(){
        document.getElementById('myOfferForm').reset();
    };
}]);

