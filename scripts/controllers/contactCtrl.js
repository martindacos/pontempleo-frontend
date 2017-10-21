angular.module("project").controller("contactCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    //Activate modals
    $('.modal').modal();
    $('select').material_select();


}]);



