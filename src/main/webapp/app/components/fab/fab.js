(function () {
    'use strict';
    angular.module('graphe.algorithms')
        .service('fab', function () {

            var fabOptions = {
                add: {
                    name: 'Adicionar',
                    icon: 'add',
                    enabled: true,
                    color: '#4CAF50',
                    message: 'Selecione "adicionar vértice" ou "adicionar aresta".',
                    contextOptions: [
                        {
                            name: 'Adicionar vértice',
                            icon: 'add_circle',
                            enabled: true,
                            color: '#4CAF50',
                            message: 'Clique no palco para adicionar um vértice.'
                        },
                        {
                            name: 'Adicionar aresta',
                            icon: 'border_color',
                            message: 'Selecione um vértice para conectá-lo a outro.',
                            enabled: true,
                            color: '#4CAF50'
                        }
                    ]
                },
                remove: {
                    name: 'Excluir',
                    icon: 'remove',
                    message: 'Clique em um vértice ou aresta para excluí-lo.',
                    enabled: true,
                    color: '#F44336'
                },

                info: {
                    name: 'Informações',
                    icon: 'info',
                    message: 'Clique em um vértice para obter informações detalhadas.',
                    enabled: true,
                    color: '#2196F3'
                }
            };

            var service = {
                fabOptions : fabOptions,
                currentOption : undefined
            };

            return service;
        });
})();