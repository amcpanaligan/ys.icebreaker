(function () {
    var app = angular.module('ys.icebreaker', [
        'angular-storage',
        'ngMaterial',
        'ngSanitize',
        'ui.router'
    ]);
})();

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
(function (angular) {
    'use strict';
    
    var icebreakerListController = function ($scope, icebreakerService) {
        
    };
    
    icebreakerListController.$inject = ['$scope', 'icebreakerService'];
    
    angular.module('ys.icebreaker').controller('icebreakerListController', icebreakerListController);
    
})(angular);

(function (angular) {
    'use strict';

    var navController = function ($mdDialog, $rootScope, $scope, icebreakerService) {

        $scope.reset = function ($event) {
            var icebreakers = icebreakerService.getIcebreakers();
            if (icebreakers.length > 0) {

                var confirm = $mdDialog.confirm()
                  .title('Reset the game?')
                  .textContent('There is/are (' + icebreakers.length + ') question(s) left. Continue?')
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

(function (angular, Math) {
    'use strict';

    var icebreakerService = function ($http, $log, $rootScope, $q, store) {
        var svc = {};

        svc.initIcebreaker = initIcebreaker;
        svc.getRandomIcebreaker = getRandomIcebreaker;
        svc.reset = reset;
        svc.getIcebreakers = getIcebreakers;

        /*
         * This function initializes the icebreaker application. Loads initial value from res files, or from local storage if available.
         */
        function initIcebreaker() {
            $log.info('initializing icebreaker service...');
            var result = $q.resolve();
            //// check if localStorage already has content.
            svc.icebreakers = store.get('icebreakers');
            if (!svc.icebreakers) {
                //// first time use in this machine, therefore load from the res files.
                result = $http.get('res/icebreakers.json').then(function (response) {
                    $log.info('icebreakers was successfully read from the file "icebreakers.json"');

                    //// setup localStorage database.
                    store.set('icebreakers', response.data);
                }, function (error) {
                    $log.warn('icebreakers.json get error', error);
                });
            }

            return result;
        }

        /*
         * This function gets a random icebreaker and removes the randomized to the current list of icebreaker questions.
         */
        function getRandomIcebreaker() {
            var icebreakers = store.get('icebreakers');
            if (icebreakers) {
                var maxIndex = icebreakers.length - 1;
                var randomIndex = Math.floor((Math.random() * maxIndex) + 1);
                
                if (maxIndex === -1) {
                    //// no more questions 
                    $log.info('All questions are used, game over. Please reset');
                    $rootScope.$broadcast('gameover');
                    return 'No questions left. Please reset.';
                }
                
                if (maxIndex === 0) {
                    randomIndex = 0;
                }
                
                var result = icebreakers[randomIndex];
                icebreakers.splice(randomIndex, 1);
                store.set('icebreakers', icebreakers);
                return result;
            }
        }

        /*
         * This function resets the icebreaker game.
         */
        function reset() {
            var result = $http.get('res/icebreakers.json').then(function (response) {
                $log.info('Icebreaker was successfully reset. Questions reloaded from file.')

                //// setup localStorage database.
                store.set('icebreakers', response.data);
            }, function (error) {
                $log.warn('icebreakers.json get error', error);
            });
            return result;
        }
        
        /*
         * This function gets the current list of icebreakers stored in the localStorage.
         */
        function getIcebreakers () {
            return store.get('icebreakers');
        }

        return svc;
    };

    icebreakerService.$inject = ['$http', '$log', '$rootScope', '$q', 'store'];
    angular.module('ys.icebreaker').service('icebreakerService', icebreakerService);

})(angular, Math);
