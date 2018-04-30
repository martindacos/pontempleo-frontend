angular.module("project").controller("cvsCtrl", ["$scope", '$cookieStore', "$route", "$http", "$location", 'restService', 'postService', function ($scope, $cookieStore, $route, $http, $location, restService, postService) {


$scope.url = restService.url;

$scope.cvsF = function () {
     $scope.auth = $cookieStore.get('globals').currentUser.authdata;

     restService.get(restService.url, "cvs?auth=" + $scope.auth, "")
            .then(function (response) {
                $scope.cvs = response.data;
                console.log($scope.cvs);
            }, function error(response) {
                $scope.cvs = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

$scope.cvsF();

    $scope.deleteCV = function(ref){
        console.log(ref);

        swal({
          title: '¿Estás seguro?',
          text: 'El CV ' + ref + ' no va a poder ser recuperado!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralo!'
        }).then(function () {
            var id = $cookieStore.get('globals').currentUser.authdata;
            //Set vars
            var deleteUrl = restService.url + "cvs/" + ref + "?auth=" + id;

            postService.deleteCV(deleteUrl)
            .then(function success(response) {
                swal('OK', 'CV eliminado correctamente','success')
                $scope.cvsF();
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');
            });
        })
    };

    $scope.deleteCVs = function(){

        swal({
          title: '¿Estás seguro?',
          text: 'El CVs no va a poder ser recuperado!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralos!'
        }).then(function () {
            var id = $cookieStore.get('globals').currentUser.authdata;
            //Set vars
            var deleteUrl = restService.url + "cvs/?auth=" + id;

            postService.deleteCV(deleteUrl)
            .then(function success(response) {
                swal('OK', 'CVs eliminados correctamente','success')
                $scope.cvsF();
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');
            });
        })
    };
}]);