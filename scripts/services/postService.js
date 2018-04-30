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

    //Add alérgeno
    this.postAle = function (uploadUrl, id, name, file) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Append data
        var fd = new FormData();
        fd.append('id', id);
        fd.append('name', name);
        fd.append('file', file);

        //Promise
        return $http.post(uploadUrl, fd, config).then(function (response) {
            return (response);
        });

    };

    //Delete alérgeno
    this.deleteA = function (uploadUrl, id, filename) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Append data
        var fd = new FormData();
        fd.append('filename', filename);

        //Promise
        return $http.post(uploadUrl + id, fd, config).then(function (response) {
            return (response);
        });

    };

    //New restaurant
    this.postRestaurant = function (uploadUrl, name) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Append data
        var fd = new FormData();
        fd.append('name', name);

        //Promise
        return $http.post(uploadUrl, fd, config).then(function (response) {
            return (response);
        });

    };

    //Offer form
    this.postContactOffer = function (uploadUrl, file, name, email, phone, message, offer, ref) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Append data
        var fd = new FormData();
        if (file != null) {
            fd.append('file', file);
        }
        fd.append('name', name);
        fd.append('email', email);
        fd.append('phone', phone);
        fd.append('message', message);
        fd.append('offer', offer);
        fd.append('ref', ref);

        //Promise
        return $http.post(uploadUrl, fd, config).then(function (response) {
            return (response);
        });

    };

    //New Offer
    this.postOffer = function (uploadUrl, nameOffer, zoneOffer, reqMinOffer, reqDesOffer, descriptionOffer) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('nameOffer', nameOffer);
        fd.append('zoneOffer', zoneOffer);
        fd.append('reqMinOffer', reqMinOffer);
        fd.append('reqDesOffer', reqDesOffer);
        fd.append('descriptionOffer', descriptionOffer);

        //Promise
        return $http.post(uploadUrl, fd, config).then(function (response) {
            return (response);
        });

    };

    //New Course
        this.postCourse = function (uploadUrl, nameCourse, zoneCourse, descriptionCourse, timeCourse, fechaIniCourse, fechaFinCourse, directionCourse, file) {

            //Set config
            var config = {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            };

            var fd = new FormData();
            fd.append('nameCourse', nameCourse);
            fd.append('zoneCourse', zoneCourse);
            fd.append('descriptionCourse', descriptionCourse);
            fd.append('timeCourse', timeCourse);
            fd.append('fechaIniCourse', fechaIniCourse);
            fd.append('fechaFinCourse', fechaFinCourse);
            fd.append('directionCourse', directionCourse);
            fd.append('file', file);

            //Promise
            return $http.post(uploadUrl, fd, config).then(function (response) {
                return (response);
            });

        };

    //Delete Offer and Restaurant
    this.deleteOffer = function (uploadUrl, ref) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Promise
        return $http.post(uploadUrl + ref, config).then(function (response) {
            return (response);
        });

    };

    //Delete CV
    this.deleteCV = function (uploadUrl) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Promise
        return $http.delete(uploadUrl, config).then(function (response) {
            return (response);
        });

    };

    //Modify Offer
    this.modifyOffer = function (uploadUrl, nameOffer, refOffer, zoneOffer, reqMinOffer, reqDesOffer, descriptionOffer, dateOffer, active) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        var fd = new FormData();
        fd.append('nameOffer', nameOffer);
        fd.append('refOffer', refOffer);
        fd.append('zoneOffer', zoneOffer);
        fd.append('reqMinOffer', reqMinOffer);
        fd.append('reqDesOffer', reqDesOffer);
        fd.append('descriptionOffer', descriptionOffer);
        fd.append('dateOffer', dateOffer);
        fd.append('active', active);

        //Promise
        return $http.post(uploadUrl, fd, config).then(function (response) {
            return (response);
        });

    };

    //Modify Course
        this.modifyCourse = function (uploadUrl, nameCourse, zoneCourse, descriptionCourse, fechaIniCourse, fechaFinCourse, directionCourse, horarioCourse, active, ref) {

            //Set config
            var config = {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            };

            var fd = new FormData();
            fd.append('nameCourse', nameCourse);
            fd.append('zoneCourse', zoneCourse);
            fd.append('descriptionCourse', descriptionCourse);
            fd.append('fechaIniCourse', fechaIniCourse);
            fd.append('fechaFinCourse', fechaFinCourse);
            fd.append('directionCourse', directionCourse);
            fd.append('horarioCourse', horarioCourse);
            fd.append('active', active);
            fd.append('ref', ref);

            //Promise
            return $http.post(uploadUrl, fd, config).then(function (response) {
                return (response);
            });

        };
}]);