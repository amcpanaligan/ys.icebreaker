(function (angular, document) {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.run(['$http', '$log', '$mdDialog', 'icebreakerService', 'store', function ($http, $log, $mdDialog, icebreakerService, store) {
        //// init returns a promise, continue using then block
        var initPromise = icebreakerService.initIcebreaker();
        
        initPromise.then(function () {
            $log.info('initialization completed!');
        });
        
        if (!store.get('user')) {
            var confirm = $mdDialog.prompt()
            .title('You are?')
            .placeholder('Name')
            .ariaLabel('Name')
            .ok('Ok');
            
            $mdDialog.show(confirm).then(function(result) {
                store.set('user', result);
                $log.info('Current user is: ', result);
            });
        } else {
            $log.info('Current user is:', store.get('user'));
        }
    }]);
    
})(angular, document);
