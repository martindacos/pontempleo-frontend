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
        $scope.inscription = inscription;
    };

    $scope.resetOffer = function(){
        document.getElementById('myOfferForm').reset();
    };

    $scope.submitOffer = function(){
        var file = document.getElementById("cv").files[0];
        if (file != null) {
           var fileName = file.name;
           console.log(fileName);
           var ext = fileName.substr(fileName.lastIndexOf('.')+1);
           if (ext != "pdf") {
                swal('Error!', 'El archivo no tiene la extensión correcta', 'error');
                return;
           }
           var newFile = new File([file], $scope.inscription + "_.pdf", {type: 'application/pdf'});
           //Set vars
           var uploadUrl = restService.url + 'offerEmail';
        } else {
            //Set vars
            var uploadUrl = restService.url + 'offerEmailSimple';
        }

        swal('Procesando su solicitud ...', '','info')
        swal.showLoading();

        postService.postContactOffer(uploadUrl, newFile, $scope.nameForm, $scope.email, $scope.phone, $scope.message, $scope.offerContactName, $scope.inscription)
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

