//Modules
angular.module("project", ['ngRoute', 'angularSpinners', 'ngCookies']);

//Sections
angular.module("project").config(["$routeProvider", function ($routeProvider) {
//Routing
    $routeProvider
        .when("/dashboard", {
            controller: "dashboardCtrl",
            templateUrl: "views/dashboard.html"
        })
        .when("/work", {
            controller: "workCtrl",
            templateUrl: "views/work.html"
        })
        .when("/contact", {
             controller: "contactCtrl",
             templateUrl: "views/contact.html"
        })
        .when("/training", {
             controller: "trainingCtrl",
             templateUrl: "views/training.html"
        })
        .when("/newOffer", {
             controller: "newOfferCtrl",
             templateUrl: "views/newOffer.html"
        })
        .when("/modifyOffer", {
             controller: "modifyOfferCtrl",
             templateUrl: "views/modifyOffer.html"
        })
        .when("/modifyCourse", {
              controller: "modifyCourseCtrl",
              templateUrl: "views/modifyCourse.html"
        })
        .when("/newCourse", {
             controller: "newCourseCtrl",
             templateUrl: "views/newCourse.html"
        })
        .when("/legal", {
              templateUrl: "views/legal.html"
        })
        .when("/login", {
              controller: "loginCtrl",
              templateUrl: "views/login.html"
        })
        .otherwise("/dashboard");


}])
    .run(['$rootScope', '$location', '$cookieStore', '$http', 'authService', function ($rootScope, $location, $cookieStore, $http, authService) {

        $rootScope.$on('$routeChangeStart', function (event) {

        if (!authService.isLoggedIn($location.path())) {
            console.log('DENY');
            console.log('Current route name: ' + $location.path());
            $location.path('/login');
         } else {
            console.log('ALLOW');
         }
        });
    }]);