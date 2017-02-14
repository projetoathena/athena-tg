/**
 * Created by Ramon on 12/02/2017.
 */
(function () {
    'use strict';

    //algoritmo Caminhos Mínimos de Dijkstra

    angular.module('graphe.algorithms')
        .service('cmDijkstra', function () {

            var n = 'Caminhos mínimos de Dijkstra',
                instructions = [],
                resultado = [],
                steps = [
                    "step1",
                    "step2",
                    "...",
                    "ultimo step"
                ];

            function run(graph) {
                console.log('iniciando caminhos mínimos Dijkstra');
                coloracaoClasse(graph);
                console.log('fim: caminhos mínimos Dijkstra');
                return resultado;
            }


            //function cmDijkstra
            //1. cria min heap size = numero de vertices
            //2. inicia com vértice escolhido de root = valor 0, todos os outros com infinito
            //3. while min heap not empty do:
            //  a. retira da pilha o adjacente ao root com menor distancia (chamado X)
            //  b. checa adjacentes do X ainda contidos na pilha (chamados V)
            //     se distancia de V for > que distancia de X + (X até V), update distancia


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