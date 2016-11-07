(function() {
    'use strict';

    angular
        .module('graphe.directives')
        .directive('gpInfo', gpInfo);

    function gpInfo () {

            return {
                templateUrl: 'components/directives/info/gpInfo.tpl.html',
                restrict: 'E',
                require: '^gpContainer',
                link: function postLink(scope, element, attrs) {
                }
            };
        }

})();