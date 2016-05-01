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