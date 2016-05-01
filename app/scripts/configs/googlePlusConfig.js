(function (angular) {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.config(['GooglePlusProvider', function(GooglePlusProvider) {
         GooglePlusProvider.init({
           clientId: '603865153070-bprrivjg6tcucau5uleg4jstnea0l7qv.apps.googleusercontent.com',
           apiKey: 'AIzaSyB1F4lzMptFVnxoLYqhTTvN8eBfnscoeLI'
         });
    }]);
    
})(angular);