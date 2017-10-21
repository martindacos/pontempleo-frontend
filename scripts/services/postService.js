angular.module("project").service("postService", ["$http", "$rootScope", "$location", function ($http, $rootScope, $location) {

    this.post = function (uploadUrl, data, name) {

        console.log(name);

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('file', data);
        fd.append('name', name);

        return $http.post(uploadUrl, fd, config)
    };

    //Post headers to remove columns
    this.postData = function (uploadUrl, file, data) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Append data
        var fd = new FormData();
        fd.append('data', data);

        //Promise
        return $http.post(uploadUrl + file, fd, config).then(function (response) {
            Materialize.toast('Done', 4000);
            return (response);
        });

    };

    this.postData2 = function (uploadUrl, trace, act, timestamp, fTimestamp) {

        //var parameters = JSON.stringify({columns:data});
        //var params = {'columns': data};

        //var greet = {"content": "Yago", "age": "21"};

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('trace', trace);
        fd.append('act', act);
        fd.append('timestamp', timestamp);
        fd.append('timestampf', fTimestamp);

        return $http.post(uploadUrl, fd, config)
    };

    this.postData3 = function (uploadUrl, column, value) {

        //var parameters = JSON.stringify({columns:data});
        //var params = {'columns': data};

        //var greet = {"content": "Yago", "age": "21"};

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('column', column);
        fd.append('value', value);

        return $http.post(uploadUrl, fd, config)
    };

    this.postData4 = function (uploadUrl, column, values, value) {

        console.log(values);

        //var parameters = JSON.stringify({columns:data});
        //var params = {'columns': data};

        //var greet = {"content": "Yago", "age": "21"};

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('column', column);
        fd.append('data', values);
        fd.append('replacement', value);

        return $http.post(uploadUrl, fd, config)
    };

    this.postForViz = function (uploadUrl, file, data) {


        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity,
            transformResponse: []
        };

        var fd = new FormData();
        fd.append('data', data);

        return $http.post(uploadUrl + file, fd, config).then(function success(response) {

            Materialize.toast('File: ' + file + ' was processed correctly', 4000);

            return response;
        }, function error(response) {
            swal('Error!', 'An error ocurred :(', 'error')
        });
    };

    this.postHierarchies = function (uploadUrl, file, hierarchies) {

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };
        var fd = new FormData();
        fd.append('data', hierarchies);

        $location.path('dashboard');

        //Promise
        return $http.post(uploadUrl + file, fd, config).then(function (response) {
            Materialize.toast('Model' + file + ' was mined correctly', 4000);

            //Fire event
            $rootScope.$broadcast('model');

            return (response);
        });

    };

    this.postPattern = function (uploadUrl, file, model, data) {

        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('model', model);
        fd.append('data', data);

        //Promise
        return $http.post(uploadUrl + file, fd, config).then(function (response) {
            Materialize.toast('Pattern saved correctly', 4000);

            //Fire event
            //$rootScope.$broadcast('model');

            return (response);
        });

    };

    this.get = function (uploadUrl) {
        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };


        //Promise
        return $http.get(uploadUrl, config).then(function (response) {
            return (response);
        });
    }

}]);