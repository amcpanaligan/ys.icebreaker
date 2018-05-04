(function () {
    //// initialize the app ys.icebreakers and its dependencies.
    var app = angular.module('ys.icebreaker', [
        'angular-storage',
        'firebase',
        'googleplus',
        'ngMaterial',
        'ngSanitize',
        'ui.router'
    ]);
})();

(function (angular) {
    'use strict';
    
    var addIcebreakerController = function ($mdDialog, $scope, firebaseService, icebreakerService) {
        var firebaseIcebreakers = firebaseService.array('Icebreakers');
        
        $scope.add = function () {
            icebreakerService.addIcebreaker($scope.icebreaker).then(function () {
                //// success in adding, so resolve the dialog.
                $mdDialog.hide(); 
            });
        };
        
        $scope.cancel = function () {
            $mdDialog.cancel();  
        };
    };
    
    addIcebreakerController.$inject = ['$mdDialog', '$scope', 'firebaseService', 'icebreakerService'];
    
    angular.module('ys.icebreaker').controller('addIcebreakerController', addIcebreakerController);
    
})(angular);
(function (angular, $) {
    'use strict';
    
    var icebreakerGameController = function ($mdDialog, $mdToast, $log, $scope, icebreakerService) {
        ////$('.tooltipped').tooltip({delay: 50});
        
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
    
})(angular, $);
(function (angular, document) {
    'use strict';
    
    var icebreakerListController = function ($log, $mdDialog, $mdToast, $scope, firebaseService, GooglePlus, icebreakerService, store) {
        //// display current (local) and display list from firebase
        loadIcebreakers();
        $scope.user = store.get('user');
        
        $scope.login = function () {
            GooglePlus.login().then(function (authResult) {
                GooglePlus.getUser().then(function (user) {
                    $scope.user = user.email || user.name;
                    store.set('user', $scope.user);
                });
            }, function (err) {
                
            });
        };
        
        $scope.submit = function () {
            icebreakerService.addIcebreaker($scope.question).then(function () {
                var toast = $mdToast.simple({
                    textContent: 'The icebreaker was successfully added.',
                    position: 'bottom right',
                    action: 'Dismiss'
                });
                $mdToast.show(toast);
            });
        };
        
        $scope.delete = function (item) {
            var id = item.$id;
            icebreakerService.removeIcebreaker(id).then(function () {
                var toast = $mdToast.simple({
                    textContent: 'The icebreaker was successfully deleted.',
                    position: 'bottom right',
                    action: 'Dismiss'
                });
                $mdToast.show(toast);
            });
        };
        
        $scope.deleteLocal = function (icebreaker) {
            icebreakerService.removeIcebreakerLocal(icebreaker);  
            //// load from local
            $scope.icebreakers = icebreakerService.getIcebreakers();
        };
        
        function loadIcebreakers() {
            //// load from firebase
            var ref = firebaseService.array('Icebreakers');
            ref.$loaded().then(function () {
                $scope.firebaseIcebreakers = ref;
            });

            //// load from local
            $scope.icebreakers = icebreakerService.getIcebreakers();
        }
    };
    
    icebreakerListController.$inject = ['$log', '$mdDialog', '$mdToast', '$scope', 'firebaseService', 'GooglePlus', 'icebreakerService', 'store'];
    
    angular.module('ys.icebreaker').controller('icebreakerListController', icebreakerListController);
    
})(angular, document);
(function (angular) {
    var app = angular.module('ys.icebreaker');
    
    var ysIcebreakerGame = function () {
        var template = '<div id="side-controls" class="right-align">' + 
                            '<a class="btn-floating ys" ng-click="reset($event)"><i class="fa fa-repeat"></i><md-tooltip md-direction="top">Reset</md-tooltip></a>' +
                            '<a class="btn-floating ys" ui-sref="list"><i class="fa fa-list-alt"></i><md-tooltip md-direction="top">List</md-tooltip></a>' +
                            '<a class="btn-floating ys" ng-href="http://github.com/amcpanaligan/ys.icebreaker" target="_blank"><i class="fa fa-github"></i><md-tooltip md-direction="top">Github</md-tooltip></a>' +
                        '</div>' +
                        '<div class="container center-align">' +
                            '<div class="row">' +
                                '<div class="col s12 m12">' +
                                    '<button class="waves-effect waves-light btn-large ys" ng-click="play()">Play</button>' +
                                    '<div class="card-panel ys" ng-show="icebreaker">' +
                                        '<h2 class="white-text" ng-bind="icebreaker.icebreaker">' +
                                        '</h2>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        
        return {
            replace: false,
            restrict: 'E',
            template: template
        };
    };
    
    app.directive('ysIcebreakerGame', ysIcebreakerGame);
})(angular);
(function (angular) {
    'use strict';
    angular.module('ys.icebreaker').run([
        'firebaseService', 
        function (firebaseService) {
            var BASE_URL = 'https://burning-torch-9438.firebaseio.com/';
            
            firebaseService.setBaseUrl(BASE_URL);
        }
    ]);
})(angular);
(function (angular) {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.config(['GooglePlusProvider', function(GooglePlusProvider) {
         GooglePlusProvider.init({
           clientId: '603865153070-bprrivjg6tcucau5uleg4jstnea0l7qv.apps.googleusercontent.com',
           apiKey: 'AIzaSyB1F4lzMptFVnxoLYqhTTvN8eBfnscoeLI'
         });
    }]);
    
})(angular);
(function (angular, document) {
    'use strict';
    
    var app = angular.module('ys.icebreaker');
    
    app.run(['$http', '$log', '$mdDialog', 'icebreakerService', 'store', function ($http, $log, $mdDialog, icebreakerService, store) {
        //// init returns a promise, continue using then block
        var initPromise = icebreakerService.initIcebreaker();
        
        initPromise.then(function () {
            $log.info('initialization completed!');
        });
        
        /*if (!store.get('user')) {
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
        }*/
    }]);
    
})(angular, document);

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
        
        $stateProvider.state('list', {
            url: '/list',
            templateUrl: 'templates/icebreakerList.html',
            controller: 'icebreakerListController'
        });
    }]);
    
})();
(function (angular) {
    'use strict';
    var firebaseService = function ($firebaseArray, $firebaseObject) {
        var svc = {};
        
        function setBaseUrl(baseUrl) {
            svc.baseUrl = baseUrl;   
        }
        
        function object(url) {
            var ref = new Firebase(svc.baseUrl + url);
            return $firebaseObject(ref);
        }
        
        function array(url) {
            var ref = new Firebase(svc.baseUrl + url);
            return $firebaseArray(ref);
        }
        
        svc.setBaseUrl = setBaseUrl;
        svc.object = object;
        svc.array = array;
        
        return svc;
    };
    
    firebaseService.$inject = ['$firebaseArray', '$firebaseObject'];
    
    angular.module('ys.icebreaker').factory('firebaseService', firebaseService);
})(angular);
(function (angular, Math) {
    'use strict';

    var icebreakerService = function ($http, $log, $rootScope, $q, firebaseService, store) {
        var svc = {};

        svc.initIcebreaker = initIcebreaker;
        svc.getRandomIcebreaker = getRandomIcebreaker;
        svc.reset = reset;
        svc.getIcebreakers = getIcebreakers;
        svc.addIcebreaker = addIcebreaker;
        svc.removeIcebreaker = removeIcebreaker;
        svc.removeIcebreakerLocal = removeIcebreakerLocal;

        //// initializes the icebreaker game. Checks if existing questions are in the localStorage, otherwise fetches from firebase.
        function initIcebreaker() {
            $log.info('initializing icebreaker service...');
            //// check if localStorage already has content.
            svc.icebreakers = store.get('icebreakers');
            
            var defer = $q.defer();
            
            if (!svc.icebreakers) {
                //// first time use in this machine, therefore load from the res files.
                var icebreakers = firebaseService.array('Icebreakers');
                
                icebreakers.$loaded().then(function () {
                    $log.info('icebreakers was successfully fetched from firebase');
                    //// setup localStorage for icebreakers.
                    console.log(icebreakers);
                    store.set('icebreakers', icebreakers);
                    defer.resolve();
                }, function (error) {
                    $log.warn('icebreakers.json get error', error);
                });
            } else {
                defer.resolve();   
            }
            
            return defer.promise;
        }

        //// gets a random icebreaker from the list saved in the localStorage and removes it afterwards.
        function getRandomIcebreaker() {
            var icebreakers = store.get('icebreakers');
            if (icebreakers) {
                var maxIndex = icebreakers.length - 1;
                var randomIndex = Math.floor((Math.random() * maxIndex) + 1);
                
                if (maxIndex === -1) {
                    //// no more questions 
                    $log.info('All questions are used, game over. Please reset');
                    $rootScope.$broadcast('gameover');
                    return {
                        icebreaker: 'No questions left. Please reset.'   
                    };
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

        //// resets the game. Clears the localStorage and re-fetch the data from firebase.
        function reset() {
            var defer = $q.defer();
            
            var icebreakers = firebaseService.array('Icebreakers');
            icebreakers.$loaded().then(function () {
                $log.info('Icebreaker was successfully reset. Questions reloaded from file.')

                //// setup localStorage database.
                store.set('icebreakers', icebreakers);
                //// resolve promise for those calls that are waiting for the reset to complete.
                defer.resolve();
            }, function (error) {
                $log.warn('icebreakers.json get error', error);
            });
            
            return defer.promise;
        }
        
        //// gets the list of icebreakers in the localStorage. Which is the list where the randomizer randomize through.
        function getIcebreakers () {
            return store.get('icebreakers');
        }
        
        //// adds the icebreaker to the current queued icebreakers (localStorage) and to firebase
        function addIcebreaker (icebreaker) {
            var defer = $q.defer();
            
            //// add the item to firebase and return the promise
            var item = {
                user: store.get('user'),
                icebreaker: icebreaker,
                $id: ''
            };
            var arr = firebaseService.array('Icebreakers');
            arr.$loaded().then(function () {
                
                //// get current, modify and re-set.
                arr.$add(item).then(function (newItem) {
                    //var icebreakers = getIcebreakers();
                    //item.$id = newItem.key();
                    //icebreakers.push(item);
                    //store.set('icebreakers', icebreakers);
                    defer.resolve(); 
                });
                
            });
            
            return defer.promise;
        }
        
        //// removes the selected icebreaker from the current list and from firebase.
        function removeIcebreaker(id) {
            var defer = $q.defer();
            
            //// find the icebreaker from the localStorage and delete it
            var icebreakers = store.get('icebreakers');
            var i = 0;
            for (i; i <= icebreakers.length - 1; i++) {
                if (icebreakers[i].$id === id) {
                    icebreakers.splice(i, 1);
                    break;
                }
            }
            store.set('icebreakers', icebreakers);
            
            //// delete the icebreaker from firebase.
            var arr = firebaseService.array('Icebreakers');
            arr.$loaded().then(function () {
                var index = arr.$indexFor(id);
                defer.resolve(arr.$remove(index));
            });
            
            return defer.promise;
        }
        
        function removeIcebreakerLocal(icebreaker) {
            var localIcebreakers = store.get('icebreakers');
            console.log('list', localIcebreakers);
            var index = localIcebreakers.indexOf(icebreaker);
            console.log('tobe deleted', index, icebreaker);
            
            localIcebreakers.splice(index, 1);
            store.set('icebreakers', localIcebreakers);
        }

        return svc;
    };

    icebreakerService.$inject = ['$http', '$log', '$rootScope', '$q', 'firebaseService', 'store'];
    angular.module('ys.icebreaker').factory('icebreakerService', icebreakerService);

})(angular, Math);
