angular.module("project").controller("workCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    $('#myModal').modal('hide');

    $scope.loading = false;
    $scope.source = "DB";
    $scope.get = function () {
        swal('Cargando ...', '','')
        swal.showLoading();

        restService.get(restService.url, "offers/", '')
            .then(function (response) {
                $scope.offers = response.data;
                swal.close();
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
        $scope.offerContactName = name;
        var myEl = angular.element( document.querySelector( '#title' ) );
        myEl.html(name);
    };

    $scope.resetOffer = function(){
        document.getElementById('myOfferForm').reset();
    };

    $scope.submitOffer = function(){
        var file = document.getElementById("cv").files[0];
        if (file != null) {
           console.log(file.name);
           //Set vars
           var uploadUrl = restService.url + 'offerEmail';
        } else {
            //Set vars
            var uploadUrl = restService.url + 'offerEmailSimple';
        }

        swal('Procesando su solicitud ...', '','info')
        swal.showLoading();

        postService.postContactOffer(uploadUrl, file, $scope.nameForm, $scope.email, $scope.phone, $scope.message, $scope.offerContactName)
        .then(function success(response) {
             document.getElementById('myOfferForm').reset();
             swal('OK', 'Mensaje enviado correctamente','success')
             $('#myModal').modal('hide');
             $scope.offerContactName = "";
             $scope.message = "";
         }, function error(response) {
             swal('Error!', 'An error ocurred :(', 'error');
        });
    };
}]);

