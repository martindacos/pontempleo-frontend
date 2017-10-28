angular.module("project").controller("newOfferCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {


$scope.newOffer = function(){
    //Set vars
    var uploadUrl = restService.url + 'newOffer';

    postService.postOffer(uploadUrl, $scope.nameOffer, $scope.zoneOffer, $scope.reqMinOffer, $scope.reqDesOffer, $scope.descriptionOffer)
    .then(function success(response) {
        document.getElementById('newOfferForm').reset();
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};


$scope.resetNewOffer = function(){
    document.getElementById('newOfferForm').reset();
};

}]);