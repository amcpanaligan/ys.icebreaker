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