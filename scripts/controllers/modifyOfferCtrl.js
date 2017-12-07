angular.module("project").controller("modifyOfferCtrl", ["$scope", "$http", '$cookieStore', "$location", 'restService', 'postService', function ($scope, $http, $cookieStore, $location, restService, postService) {

    $scope.loading = false;
    $scope.source = "DB";
    $scope.get = function () {
        var id = $cookieStore.get('globals').currentUser.authdata;
        restService.get(restService.url, "allOffers?auth=" + id, '')
            .then(function (response) {
                $scope.offers = response.data;
            }, function error(response) {
                $scope.offers = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

    $scope.get();

    $scope.deleteOffer = function(ref){
        console.log(ref);

        swal({
          title: '¿Estás seguro?',
          text: 'La oferta ' + ref + ' no va a poder ser recuperada!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórrala!'
        }).then(function () {
            var id = $cookieStore.get('globals').currentUser.authdata;
            //Set vars
            var deleteUrl = restService.url + "deleteOffer/" + ref + "?auth=";

            postService.deleteOffer(deleteUrl, id)
            .then(function success(response) {
                swal('OK', 'Oferta eliminada correctamente','success')
                $scope.get();
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');
            });
        })
    };

    $scope.editOffer = function(of){
        $scope.editOf = of;
        $scope.nameOffer = of.name;
        $scope.refOffer = of.ref;
        $scope.zoneOffer = of.zone;
        $scope.reqMinOffer = of.minReq;
        $scope.reqDesOffer = of.req;
        $scope.descriptionOffer = of.description;
        $scope.dateOffer = of.date;
        $scope.activeOffer = of.active;
        $scope.test = of.active;
    };

    $scope.modifyOffer = function(){
        //Set vars
        var id = $cookieStore.get('globals').currentUser.authdata;
        var uploadUrl = restService.url + 'modifyOffer?auth=' + id;
        console.log($scope.test);

        postService.modifyOffer(uploadUrl, $scope.nameOffer, $scope.refOffer, $scope.zoneOffer, $scope.reqMinOffer, $scope.reqDesOffer, $scope.descriptionOffer
        , $scope.dateOffer, $scope.test)
        .then(function success(response) {
             $('#editOfferModal').modal('hide');
            $scope.get();
            swal('OK', 'Oferta modificada correctamente','success')
        }, function error(response) {
            swal('Error!', 'An error ocurred :(', 'error');
        });
    };
}]);

