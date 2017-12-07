angular.module("project").controller("newOfferCtrl", ["$scope", '$cookieStore', "$http", "$location", 'restService', 'postService', function ($scope, $cookieStore, $http, $location, restService, postService) {


$scope.newOffer = function(){
    //Set vars
    var id = $cookieStore.get('globals').currentUser.authdata;
    var uploadUrl = restService.url + "newOffer?auth=" + id;

    postService.postOffer(uploadUrl, $scope.nameOffer, $scope.zoneOffer, $scope.reqMinOffer, $scope.reqDesOffer, $scope.descriptionOffer)
    .then(function success(response) {
        document.getElementById('newOfferForm').reset();
        swal('OK', 'Oferta añadida correctamente','success')
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};


$scope.resetNewOffer = function(){
    document.getElementById('newOfferForm').reset();
};

}]);