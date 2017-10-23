angular.module("project").controller("contactCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    $scope.submitContact = function(){
        console.log(this.nameForm);
    };

}]);



