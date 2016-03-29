(function (angular) {
    'use strict';
    angular.module('ys.icebreaker').run([
        'firebaseService', 
        function (firebaseService) {
            var BASE_URL = 'https://burning-torch-9438.firebaseio.com/';
            
            firebaseService.setBaseUrl(BASE_URL);
        }
    ]);
})(angular);