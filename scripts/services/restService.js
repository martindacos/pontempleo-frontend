angular.module("project").service("restService", ["$http", function($http){

    this.get = function(url, service, id){
        return $http.get(url + service + id);
    };

    this.delete = function(url, service, id){
        return $http.delete(url + service + id);
    };

    //Localhost
    this.url = 'http://localhost:8080/'
    //Web IP
    //this.url = 'http://149.202.56.49:8080/'
}]);