angular.module("project").controller("modifyOfferCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    $scope.loading = false;
    $scope.source = "DB";
    $scope.get = function () {
        restService.get(restService.url, "allOffers/", '')
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
          confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            //Set vars
            var deleteUrl = restService.url + 'deleteOffer' + "?ref=";

            postService.deleteOffer(deleteUrl, ref)
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
    };

    $scope.modifyOffer = function(){
        //Set vars
        var uploadUrl = restService.url + 'modifyOffer';
        console.log($scope.test);

        postService.modifyOffer(uploadUrl, $scope.nameOffer, $scope.refOffer, $scope.zoneOffer, $scope.reqMinOffer, $scope.reqDesOffer, $scope.descriptionOffer
        , $scope.dateOffer, $scope.test)
        .then(function success(response) {
             $('#editOfferModal').modal('hide');
            //$('#editOfferModal').modal('close');
            $scope.get();
            swal('OK', 'Oferta modificada correctamente','success')
        }, function error(response) {
            swal('Error!', 'An error ocurred :(', 'error');
        });
    };
}]);

