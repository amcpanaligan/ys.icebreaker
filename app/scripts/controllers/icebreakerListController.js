(function (angular, document) {
    'use strict';
    
    var icebreakerListController = function ($log, $mdDialog, $mdToast, $scope, firebaseService, icebreakerService) {
        //// display current (local) and display list from firebase
        loadIcebreakers();
        
        $scope.submit = function () {
            icebreakerService.addIcebreaker($scope.question).then(function () {
                var toast = $mdToast.simple({
                    textContent: 'The icebreaker was successfully added.',
                    position: 'top right',
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
                    position: 'top right',
                    action: 'Dismiss'
                });
                $mdToast.show(toast);
            });
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
    
    icebreakerListController.$inject = ['$log', '$mdDialog', '$mdToast', '$scope', 'firebaseService', 'icebreakerService'];
    
    angular.module('ys.icebreaker').controller('icebreakerListController', icebreakerListController);
    
})(angular, document);