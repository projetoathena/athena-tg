/**
 * Created by Ramon on 12/02/2017.
 */
(function () {
    'use strict';

    //algoritmo Árvore geradora de custo mínimo de Kruskal

    angular.module('graphe.algorithms')
        .service('agcmKruskal', function () {

            var n = 'Árvore geradora de custo mínimo de Kruskal',
                instructions = [],
                resultado = [],
                steps = [
                    "step1",
                    "step2",
                    "...",
                    "ultimo step"
                ];

            function run(graph) {
                console.log('iniciando árvore geradora de custo mínimo de Kruskal');
                coloracaoClasse(graph);
                console.log('fim: Árvore geradora de custo mínimo de Kruskal');
                return resultado;
            }

            //function cmDijkstra

            var service = {
                name: n,
                steps: steps,
                result: resultado,
                instructions: instructions,
                run: run,
                usaCores: true,
                usaFila: true
            };

            return service;


        }