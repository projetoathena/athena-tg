(function () {
    'use strict';

    angular.module('graphe.services')
        .service('contextMessage', contextMessage);

    function contextMessage() {

        var message = '';

        function setMessage(m) {
            message = m;
        }

        var service = {
            message: message,
            setMessage: setMessage
        };

        return service;
    }
})();