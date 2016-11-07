(function () {
    'use strict';
    angular.module('graphe.algorithms')
        .service('bfs', function () {

            /**
             * Percurso em largura, adaptado de handbook of graph theory
             * 2.1.2
             * @type {string}
             */

            var nome = 'Percurso em largura',
                instrucoes = [],
                resultado = [],
                passos = [
                    "Visita-se um nó n previamente selecionado;",                     //0
                    "Marca o nó n",                                                   //1
                    "Inserir n em uma fila F",                                        //2
                    "Enquanto a fila F não estiver vazia",                            //3
                    "        Retira um elemento da fila F e atribui ao nó n",         //4
                    "        Para cada nó m não marcado e adjacente a n faça",        //5
                    "                O nó m é visitado",                              //6
                    "                O nó m é colocado na fila F",                    //7
                    "                O nó m é marcado",                               //8
                    "Fim do algoritmo"                                                //9
                ];

            /**
             * @param  {Graph} graph The graph to be visited
             * @param  {Node} visited The initial node.
             */
            function run(graph, visited) {
                console.log('starting algorithm');
                resultado = [];
                var node = graph.getNode(visited);
                bfs(graph, node);
                console.log('end of algorithm');
                console.log(resultado);
                return resultado;
            }

            function bfs(G, verticeInicial) {

                var fila = [];
                var resultadoFinal = [];
                verticeInicial.marcado = true;
                resultado.push({ operacao: 'visitar_no', passo: 0, fila: [], item: verticeInicial, resultado:resultadoFinal.slice() });
                resultado.push({ operacao: 'marcar_no', passo: 1, fila: [], item: verticeInicial, resultado:resultadoFinal.slice() });

                // Adiciona à fila
                fila.push(verticeInicial);
                resultado.push({ operacao: '', passo: 2, fila: fila.slice(), resultado:resultadoFinal.slice() });

                while (fila.length > 0) {
                    resultado.push({ operacao: '', passo: 3, fila: fila.slice(), resultado:resultadoFinal.slice() });
                    //Pega primeiro item da fila
                    var n = fila.shift();
                    resultadoFinal.push(n);
                    resultado.push({ operacao: '', passo: 4, fila: fila.slice(), resultado:resultadoFinal.slice()  });


                    G.getAdjacencyList(n).forEach(function(m){
                        resultado.push({ operacao: '', passo: 5, fila: fila.slice(),resultado: resultadoFinal.slice() });
                        if (!m.marcado) {
                            m.marcado = true;
                            resultado.push({ operacao: 'visitar_no', passo: 6, fila:fila.slice(), item:m, resultado:resultadoFinal.slice() });
                            fila.push(m);
                            resultado.push({ operacao: '', passo: 7, fila:fila.slice(), resultado:resultadoFinal.slice() });
                            resultado.push({ operacao: 'marcar_no', passo: 8, fila:fila.slice(), item:m,resultado:resultadoFinal.slice() });
                        }
                    });
                }

                resultado.push({ operacao: '', passo: 9, fila:fila.slice(),resultado:resultadoFinal.slice() });

                G.getNodes().forEach(function(vertice){
                    if(angular.isDefined(vertice.marcado)) {
                        delete vertice.marcado;
                    }
                });
            }

            //noinspection UnnecessaryLocalVariableJS
            var service = {
                name: nome,
                steps: passos,
                result: resultado,
                instructions: instrucoes,
                run: run,
                usaFila : true
            };

            return service;
        });
})();