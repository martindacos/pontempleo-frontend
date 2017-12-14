angular.module('project').directive('validfile', function validFile() {

    var validFormats = ['pdf'];
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$validators.validFile = function() {
                elem.on('change', function () {
                   var value = elem.val(),
                       ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

                   return validFormats.indexOf(ext) !== -1;
                });
           };
        }
    };
});