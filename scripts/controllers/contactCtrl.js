angular.module("project").controller("contactCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {


$scope.submitContact = function(){
    //Set vars
    var uploadUrl = restService.url + 'contactEmail' + "?name=";

    postService.postData(uploadUrl, $scope.nameForm, $scope.email, $scope.phone, $scope.description)
    .then(function success(response) {
        document.getElementById('myForm').reset();
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};


$scope.resetContact = function(){
    document.getElementById('myForm').reset();
};

}]);