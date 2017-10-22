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
        .when("/result", {
            controller: "resultCtrl",
            templateUrl: "views/result.html"
        })
        .when("/contact", {
             controller: "contactCtrl",
             templateUrl: "views/contact.html"
        })
        .when("/training", {
             controller: "trainingCtrl",
             templateUrl: "views/training.html"
        })
        .otherwise("/dashboard");


}])
    .run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {

        //Init vars
        $rootScope.showNav = true;
        console.log($rootScope.showNav);

    }]);