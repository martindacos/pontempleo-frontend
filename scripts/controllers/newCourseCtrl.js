angular.module("project").controller("newCourseCtrl", ["$scope", '$cookieStore', "$http", "$location", 'restService', 'postService', function ($scope, $cookieStore, $http, $location, restService, postService) {


$scope.newCourse = function(){
    //Set vars
    var id = $cookieStore.get('globals').currentUser.authdata;
    var uploadUrl = restService.url + 'newCourse?auth=' + id;

    postService.postCourse(uploadUrl, $scope.nameCourse, $scope.zoneCourse, $scope.descriptionCourse, $scope.timeCourse, $scope.fechaIniCourse, $scope.fechaFinCourse
    , $scope.directionCourse, $scope.data.file)
    .then(function success(response) {
        document.getElementById('newCourseForm').reset();
        swal('OK', 'Curso añadido correctamente','success')
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};


$scope.resetNewCourse = function(){
    document.getElementById('newCourseForm').reset();
};

}]);