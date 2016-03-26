(function (angular) {
    'use strict';
    
    var icebreakerGameController = function ($mdDialog, $mdToast, $log, $scope, icebreakerService) {
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
        
        $scope.reset = function ($event) {
            var icebreakers = icebreakerService.getIcebreakers();
            if (icebreakers.length > 0) {

                var confirm = $mdDialog.confirm()
                  .title('Reset the game?')
                  .textContent('There is/are (' + icebreakers.length + ') question(s) left. Reset?')
                  .ariaLabel('Confirm')
                  .targetEvent($event)
                  .ok('Yes')
                  .cancel('No');
                
                $mdDialog.show(confirm).then(function () {
                    reset();
                }, function () {
                    
                });

            } else {
                reset();
            }
        };
        
        function reset () {
            $scope.$broadcast('reset');
            icebreakerService.reset();
        }
    };
    
    icebreakerGameController.$inject = ['$mdDialog', '$mdToast', '$log', '$scope', 'icebreakerService'];
    
    angular.module('ys.icebreaker').controller('icebreakerGameController', icebreakerGameController);
    
})(angular);