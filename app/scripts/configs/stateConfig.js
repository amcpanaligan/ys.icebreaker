(function () {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/game');
        
        $stateProvider.state('game', {
            url: '/game',
            templateUrl: 'templates/icebreaker-game.html',
            controller: 'icebreakerGameController'
        });
        
    }]);
    
})();