(function () {
    'use strict';

    /**
     * Main module of the application.
     */
    angular
        .module('graphe', [
            'graphe.core',
            'graphe.algorithms',
            'graphe.directives',
            'graphe.fab',
            'graphe.model',
            'graphe.services'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'app/main/main.tpl.html',
                    controller: 'MainCtrl',
                    index: 1
                })
                .when('/graph', {
                    templateUrl: 'app/graph/graph.tpl.html',
                    //controller: 'GraphCtrl',
                    index: 2
                })

                .when('/about', {
                    templateUrl: 'app/about/about.tpl.html',
                    controller: 'AboutCtrl',
                    index: 3
                })
                .when('/contact', {
                    templateUrl: 'app/contact/contact.tpl.html',
                    controller: 'ContactCtrl',
                    index: 4
                })

                .otherwise({
                    redirectTo: '/'
                });
        });

})();