angular.module("project").controller("newCourseCtrl", ["$scope", '$cookieStore', "$http", "$location", 'restService', 'postService', function ($scope, $cookieStore, $http, $location, restService, postService) {


$scope.newCourse = function(){
    //Set vars
    var id = $cookieStore.get('globals').currentUser.authdata;
    var uploadUrl = restService.url + 'newCourse?auth=' + id;

    var file = document.getElementById("imgCourse").files[0];
    var fileName = file.name;
    console.log(fileName);
    var ext = fileName.substr(fileName.lastIndexOf('.')+1);
    if (ext != "jpg" && ext != "png") {
        swal('Error!', 'El archivo no tiene la extensión correcta', 'error');
        return;
    }

    postService.postCourse(uploadUrl, $scope.nameCourse, $scope.zoneCourse, $scope.descriptionCourse, $scope.timeCourse, $scope.fechaIniCourse, $scope.fechaFinCourse
    , $scope.directionCourse, file)
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