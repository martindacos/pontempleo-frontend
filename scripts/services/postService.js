angular.module("project").service("postService", ["$http", "$rootScope", "$location", function ($http, $rootScope, $location) {

    //Contact form
    this.postData = function (uploadUrl, file, email, phone, description) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Append data
        var fd = new FormData();
        fd.append('email', email);
        fd.append('phone', phone);
        fd.append('description', description);

        //Promise
        return $http.post(uploadUrl + file, fd, config).then(function (response) {
            return (response);
        });

    };

}]);