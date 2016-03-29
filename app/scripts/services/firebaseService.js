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