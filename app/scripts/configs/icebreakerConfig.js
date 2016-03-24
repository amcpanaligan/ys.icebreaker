(function (angular) {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.run(['$http', '$log', 'icebreakerService', function ($http, $log, icebreakerService) {
        //// init returns a promise, continue using then block
        var initPromise = icebreakerService.initIcebreaker();
        
        initPromise.then(function () {
            $log.info('initialization completed!');
        });
    }]);
    
})(angular);
