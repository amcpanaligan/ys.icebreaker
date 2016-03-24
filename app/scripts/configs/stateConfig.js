(function () {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/game');
        
        $stateProvider.state('icebreakers', {
            url: '/icebreakers',
            templateUrl: 'templates/icebreaker/icebreaker-list.html',
            controller: 'icebreakerListController'
        });
        
        $stateProvider.state('game', {
            url: '/game',
            templateUrl: 'templates/icebreaker/icebreaker-game.html',
            controller: 'icebreakerGameController'
        });
        
    }]);
    
})();