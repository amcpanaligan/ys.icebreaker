(function (angular) {
    'use strict';

    var navController = function ($mdDialog, $rootScope, $scope, icebreakerService) {

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
            icebreakerService.reset();
            $rootScope.$broadcast('reset');
        }
    };

    navController.$inject = ['$mdDialog', '$rootScope', '$scope', 'icebreakerService'];

    angular.module('ys.icebreaker').controller('navController', navController);
})(angular);
