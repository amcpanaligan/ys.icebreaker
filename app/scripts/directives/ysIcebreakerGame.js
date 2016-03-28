(function (angular) {
    var app = angular.module('ys.icebreaker');
    
    var ysIcebreakerGame = function () {
        var template = '<div id="side-controls" class="right-align">' + 
                            '<a class="btn-floating ys" ng-click="reset($event)"><i class="fa fa-repeat"></i></a>' +
                            '<a class="btn-floating ys" ng-href="http://github.com/amcpanaligan/ys.icebreaker"><i class="fa fa-github"></i></a>' +
                        '</div>' +
                        '<div class="container center-align">' +
                            '<div class="row">' +
                                '<div class="col s12 m12">' +
                                    '<a class="waves-effect waves-light btn-large ys" ng-click="play()">Play</a>' +
                                    '<div class="card-panel ys" ng-show="icebreaker">' +
                                        '<h2 class="white-text" ng-bind="icebreaker">' +
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