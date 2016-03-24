(function (angular) {
    'use strict';
    
    var icebreakerGameController = function ($log, $scope, icebreakerService) {
        $scope.$on('gameover', function (event) {
            
        });
        
        $scope.$on('reset', function (event) {
            $scope.icebreaker = 'The game was reset.';
        });
        
        $scope.play = function () {
            var icebreaker = icebreakerService.getRandomIcebreaker();
            $scope.icebreaker = icebreaker;
        };
    };
    
    icebreakerGameController.$inject = ['$log', '$scope', 'icebreakerService'];
    
    angular.module('ys.icebreaker').controller('icebreakerGameController', icebreakerGameController);
    
})(angular);