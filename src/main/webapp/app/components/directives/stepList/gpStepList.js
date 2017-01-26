(function () {
    'use strict';

    angular.module('graphe')
        .directive('gpStepList', function () {

            return {
                templateUrl: 'app/components/directives/stepList/gpStepList.tpl.html',
                restrict: 'E',
                require: '^gpAlgorithmPlayer',
                link: function postLink(scope, element, attrs, gpStageCtrl) {

                    scope.hideSteps = false;
                }
            };
        });
})();