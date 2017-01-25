(function () {
    'use strict';

    angular.module('graphe.services')
        .service('toast', ['$mdToast', toast]);

    function toast($mdToast) {

        var toastPosition = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };

        function showSimpleToast(message) {

            if ($mdToast !== undefined) {
                console.log('toast');
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                       // .action('Got it.')
                        .highlightAction(false)
                        .position(getToastPosition())
                        .hideDelay(3000))
                    .then(function () {
                        console.log('got it.');
                    });
            }
        }

        function getToastPosition() {
            return Object.keys(toastPosition)
                .filter(function (pos) {
                    return toastPosition[pos];
                })
                .join(' ');
        }

        var service = {
            showSimpleToast: showSimpleToast
        };

        return service;
    }
})();