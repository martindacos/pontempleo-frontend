angular.module("project").controller("modifyCourseCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {

    $scope.loading = false;
    $scope.source = "DB";
    $scope.get = function () {
        restService.get(restService.url, "allCourses/", '')
            .then(function (response) {
                $scope.courses = response.data;
            }, function error(response) {
                $scope.courses = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

    $scope.get();

    $scope.deleteCourse = function(ref){
        console.log(ref);

        swal({
          title: '¿Estás seguro?',
          text: 'El curso ' + ref + ' no va a poder ser recuperado!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralo!'
        }).then(function () {
            //Set vars
            var deleteUrl = restService.url + 'deleteCourse' + "?ref=";

            postService.deleteOffer(deleteUrl, ref)
            .then(function success(response) {
                swal('OK', 'Curso eliminado correctamente','success')
                $scope.get();
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');
            });
        })
    };

    $scope.editCourse = function(course){
        $scope.editOf = course;
        $scope.nameCourse = course.name;
        $scope.zoneCourse = course.zone;
        $scope.descriptionCourse = course.description;
        $scope.dateCourse = course.time;
        $scope.activeCourse = course.active;
        $scope.fechaIniCourse = course.dateIni;
        $scope.fechaFinCourse = course.dateFin;
        $scope.directionCourse = course.direction;
        $scope.test = course.active;
    };

    $scope.modifyCourse = function(){
        //Set vars
        var uploadUrl = restService.url + 'modifyCourse';
        console.log($scope.test);

        postService.modifyCourse(uploadUrl, $scope.nameCourse, $scope.zoneCourse, $scope.descriptionCourse, $scope.fechaIniCourse, $scope.fechaFinCourse, $scope.directionCourse
        , $scope.dateCourse, $scope.test)
        .then(function success(response) {
             $('#editCourseModal').modal('hide');
            $scope.get();
            swal('OK', 'Curso modificado correctamente','success')
        }, function error(response) {
            swal('Error!', 'An error ocurred :(', 'error');
        });
    };
}]);

