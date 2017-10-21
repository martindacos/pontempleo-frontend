angular.module("project").service("restService", ["$http", function($http){

    this.get = function(url, service, id){
        return $http.get(url + service + id);
    };

    this.delete = function(url, service, id){
        return $http.delete(url + service + id);
    };



    this.uniques = '';
    this.file = '';
    this.data = '';
    this.models = '';
    this.graphs = '';

    //Localhost
    this.url = 'http://localhost:8080/'

}]);