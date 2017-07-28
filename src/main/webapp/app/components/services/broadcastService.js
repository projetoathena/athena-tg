(function () {
    'use strict';

    angular.module('graphe.services')
        .service('broadcastService', broadcastService);

    function broadcastService($rootScope) {

        var message = '';
        var object;


        var service = {
            message: message,
            object: object,
            broadcast: broadcast
        };

        function broadcast(m,o){

            console.log('emitindo');
            console.log(m);
            console.log(o);


            service.message = m || '';
            service.object = o;

            $rootScope.$broadcast(m);
        }

        return service;
    }
})();
