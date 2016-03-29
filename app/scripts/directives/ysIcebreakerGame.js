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