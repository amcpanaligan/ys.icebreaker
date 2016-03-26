(function () {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/game');
        
        $stateProvider.state('game', {
            url: '/game',
            template: '<ys-icebreaker-game></ys-icebreaker-game>',
            controller: 'icebreakerGameController'
        });
        
    }]);
    
})();