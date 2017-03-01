/**
 * Created by Henrique on 01/03/2017.
 */
(function () {
    'use strict';

    angular.module('graphe.algorithms')
        .service('caminhoMinimo', function () {

            var n = 'Arvore Geradora Minima',
                instructions = [],
                //result = [],
                resultado = [],
                steps = [
                    "procedimento PRIM (T)",                         //0
                    "para todo k ∈ T faça",                         //1
                    "   para todo i ∈ V - T faça",                  //2
                    "       se Vki < valor então",                   //3
                    "           valor ← Vki;vint ← k;vext ← i;", //4
                    "       fim se",                        //5
                    "   fim para",       //6
                    "fim para",                    //7
                    "custo ← cursto + valor;T ← T ⋃ { vext };",  //8
                    "E' ← E' ⋃ { (vext,vint) }; valor ← ∞;",                               //9
                    "se T ≠ V então PRIM (T)",                       //10
                    "fim procedimento"                              //11
                ];

            /**
             *
             * @param graph
             * @param visited
             * @returns {Array}
             */
            function run(graph) {
                console.log('iniciando arvore geradora minima');
                coloracaoSequencial(graph);
                console.log('fim: arvore geradora minima');
                console.log(resultado);
                return resultado;
            }


            function arvoreGeradoraMinima(G) {

                var nos = G.getNodes();
                var C = [];
                var i;
                var k;
                resultado = [];
                //algoritimo


            }

            //noinspection UnnecessaryLocalVariableJS
            var service = {
                name: n,
                steps: steps,
                result: resultado,
                instructions: instructions,
                run: run,
                usaCores: true
            };

            return service;

        });
})();
