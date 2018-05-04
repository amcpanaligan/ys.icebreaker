(function (angular) {
    'use strict';
    angular.module('ys.icebreaker').run([
        'firebaseService', 
        function (firebaseService) {
            var BASE_URL = 'https://ys-culture-code.firebaseio.com/';
            
            firebaseService.setBaseUrl(BASE_URL);
        }
    ]);
})(angular);