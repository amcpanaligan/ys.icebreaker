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
