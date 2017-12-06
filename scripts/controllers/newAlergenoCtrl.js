angular.module("project").controller("newAlergenoCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

$scope.myHide = true;

    $scope.get = function () {
        restService.get(restService.url, "allRestaurants/", '')
            .then(function (response) {
                $scope.res = response.data;
            }, function error(response) {
                $scope.res = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

    $scope.get();

$scope.newR = function(){
    //Set vars
    var uploadUrl = restService.url + 'newRestaurant';

    console.log($scope.nameRestaurant);

    postService.postRestaurant(uploadUrl, $scope.nameRestaurant)
    .then(function success(response) {
        document.getElementById('newRestaurantForm').reset();
        $scope.get();
        swal('OK', 'Restaurante añadido correctamente','success')
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};

$scope.deleteR = function(id){
        console.log(id);

        swal({
          title: '¿Estás seguro?',
          text: 'El restaurante ' + id + ' y todos sus ficheros no van a poder ser recuperados!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralo!'
        }).then(function () {
            //Set vars
            var deleteUrl = restService.url + 'deleteRestaurant' + "?id=";
            postService.deleteOffer(deleteUrl, id)

            .then(function success(response) {
                swal('OK', 'Restaurante eliminado correctamente','success')
                $scope.get();
                $scope.myHide = true;
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');
            });
        })
    };

    $scope.editR = function(r){
        $scope.id = r.id;
        $scope.myHide = false;

        $scope.alergenos();
    };

$scope.submitAler = function(){
    console.log($scope.id);
    var file = document.getElementById("aleM").files[0];
    if (file) {
       console.log(file.name);
    }

    //Set vars
    var uploadUrl = restService.url + 'newAle';

    postService.postAle(uploadUrl, $scope.id, $scope.nameM2, file)
    .then(function success(response) {
        document.getElementById('myForm').reset();
        $scope.alergenos();
        swal('OK', 'Alérgeno añadido correctamente','success')
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};

$scope.alergenos = function () {
     restService.get(restService.url, "allAlergenos?id=" + $scope.id, "")
            .then(function (response) {
                $scope.ale = response.data;
                console.log($scope.ale);
            }, function error(response) {
                $scope.ale = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

$scope.deleteA = function(filename){
        console.log(filename);

        swal({
          title: '¿Estás seguro?',
          text: 'El archivo ' + filename + ' no va a poder ser recuperado!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralo!'
        }).then(function () {
            //Set vars
            var deleteUrl = restService.url + 'deleteAlergeno' + "?id=";
            postService.deleteA(deleteUrl, $scope.id, filename)

            .then(function success(response) {
                swal('OK', 'Archivo eliminado correctamente','success')
                $scope.alergenos();
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');
            });
        })
    };

$scope.showA = function(filename){
        console.log(filename);

        restService.get(restService.url, "getAlergeno/" + $scope.id + "?filename=" + filename, '')
        .then(function (response) {
              $scope.pdf = response.data;
        }, function error(response) {
              swal('Error!', 'An error ocurred :(', 'error');
        });
    };

}]);