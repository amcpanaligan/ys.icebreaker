(function (angular) {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.config(['GooglePlusProvider', function(GooglePlusProvider) {
         GooglePlusProvider.init({
           clientId: '603865153070-h5jaqp6u2cm6o6ijoqp7a66erk5mrifb.apps.googleusercontent.com',
           apiKey: 'AIzaSyAaoVYp_IdQASCYxAdFOfPGxFHwDRY1qwA'
         });
    }]);
    
})(angular);