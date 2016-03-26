(function (angular) {
    'use strict';
    
    var icebreakerGameController = function ($mdToast, $log, $scope, icebreakerService) {
        $scope.$on('gameover', function (event) {
            
        });
        
        $scope.$on('reset', function (event) {
            //$scope.icebreaker = '';
            var toast = $mdToast.simple({
                textContent: 'The game was successfully reset.',
                position: 'top right',
                action: 'Dismiss'
            });
            $mdToast.show(toast);
        });
        
        $scope.play = function () {
            var icebreaker = icebreakerService.getRandomIcebreaker();
            $scope.icebreaker = icebreaker;
        };
    };
    
    icebreakerGameController.$inject = ['$mdToast', '$log', '$scope', 'icebreakerService'];
    
    angular.module('ys.icebreaker').controller('icebreakerGameController', icebreakerGameController);
    
})(angular);