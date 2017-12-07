angular.module("project").controller('loginCtrl', ['$scope', '$rootScope', '$location', 'authService', function ($scope, $rootScope, $location, authService) {

    //reset login status
    authService.ClearCredentials();

    //Login function
    $scope.login = function () {
        authService.Login($scope.email, $scope.pass)
        .then(function success(response) {
              document.getElementById('loginForm').reset();
              authService.SetCredentials($scope.email, $scope.pass);
              swal('OK', 'Sesión iniciada correctamente','success')
              $location.path('/modifyOffer');
        }, function error(response) {
              swal('Error!', 'Autenticación incorrecta', 'error');
        });
    };

}]);