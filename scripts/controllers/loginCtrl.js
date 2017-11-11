angular.module("project").controller('loginCtrl', ['$scope', '$rootScope', '$location', 'authService', function ($scope, $rootScope, $location, authService) {

    //reset login status
    authService.ClearCredentials();

    //Login function
    $scope.login = function () {
        authService.Login($scope.email, $scope.pass, function (response) {
        console.log(response);
            if (response === 200) {
                document.getElementById('loginForm').reset();
                authService.SetCredentials($scope.email, $scope.pass);
                swal('OK', 'Sesión iniciada correctamente','success')
                $location.path('/modifyOffer');
            } else {
                console.log(response);
                swal('Error!', 'An error ocurred :(', 'error');
            }
        });
    };

}]);