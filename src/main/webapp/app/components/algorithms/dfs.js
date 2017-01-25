(function () {
    'use strict';

    /**
     * Algoritmo depth first search, adaptado de handbook of graph theory
     *  seção 2.1.2
     */

    // TODO trocar por versão não recursiva

    angular.module('graphe.algorithms')
        .service('dfs', function () {

            var n = 'Percurso em profundidade',
                instructions = [],
                result = [],
                steps = [
                    "Visita-se um nó n previamente selecionado",
                    "Marca o nó n",
                    "Empilha n em uma pilha P",
                    "Enquanto a pilha P não estiver vazia",
                    "		O nó n é desempilhado da pilha P",
                    "		Para cada nó m não marcado e adjacente a n faça",
                    "				O nó m é visitado",
                    "				O nó n é colocado na pilha P",
                    "				O nó m é marcado",
                    "				Troca o valor de n para m",
                    "Fim do algoritmo"
                ];


            function run(graph, visited) {
                result = [];
                console.log('starting dfs');
                var node = graph.getNode(visited);
                dfs(graph, node);
                console.log('end of dfs');
                console.log(result);
                return result;
            }

            function dfs(G, verticeInicial) {

                var pilha = [];
                var resultadoFinal = [];
                verticeInicial.marcado = true;

                result.push({ operacao: 'visitar_no', passo: 0, pilha: [], item: verticeInicial, resultado:resultadoFinal.slice() });
                result.push({ operacao: 'marcar_no', passo: 1, pilha: [], item: verticeInicial, resultado:resultadoFinal.slice() });

                // Adiciona à pilha
                pilha.unshift(verticeInicial);

                result.push({ operacao: '', passo: 2, pilha: pilha.slice(), resultado:resultadoFinal.slice() });

                resultadoFinal.push(verticeInicial);

                while (pilha.length > 0) {
                    result.push({ operacao: '', passo: 3, pilha: pilha.slice(), resultado:resultadoFinal.slice() });
                    //Pega primeiro item da pilha
                    var n = pilha[0];

                    result.push({ operacao: '', passo: 4, pilha: pilha.slice(), resultado:resultadoFinal.slice() });

                    var adjacentes = G.getAdjacencyList(n);

                    for(var i = 0; i < adjacentes.length;){

                        result.push({ operacao: '', passo: 5, pilha: pilha.slice(), resultado:resultadoFinal.slice() });

                        var m = adjacentes[i];

                        if (!m.marcado) {


                            console.log('visitando');
                            console.log(m.label);
                            resultadoFinal.push(m);

                            result.push({ operacao: 'visitar_no', item:m, passo: 6, pilha: pilha.slice(), resultado:resultadoFinal.slice() });
                            pilha.unshift(m);
                            result.push({ operacao: 'marcar_no', item: m, passo: 7, pilha: pilha.slice(), resultado:resultadoFinal.slice() });
                            m.marcado = true;
                            result.push({ operacao: '', passo: 8, pilha: pilha.slice(), resultado:resultadoFinal.slice() });
                            n = m;
                            result.push({ operacao: '', passo: 9, pilha: pilha.slice(), resultado:resultadoFinal.slice() });

                            adjacentes = G.getAdjacencyList(n);
                            i = 0;
                            continue;
                        }

                        i++;
                    }

                    pilha.shift();
                }

                result.push({ operacao: '', passo: 10, pilha: pilha.slice(), resultado:resultadoFinal.slice() });

                console.log(result);



                G.getNodes().forEach(function(vertice){
                    if(angular.isDefined(vertice.marcado)) {
                        delete vertice.marcado;
                    }
                });
            }

            //noinspection UnnecessaryLocalVariableJS
            var service = {
                name: n,
                steps: steps,
                result: result,
                instructions: instructions,
                run: run,
                usaPilha: true
            };

            return service;

        });
})();