(function () {
    'use strict';
    angular.module('graphe.algorithms')
        .service('menorArvore', function () {

            /**
             * Percurso em largura, adaptado de handbook of graph theory
             * 2.1.2
             * @type {string}
             */

            var nome = 'Arvore de Custo Mínimo',
                instrucoes = [],
                resultado = [],
                passos = [
                    "Seleciona a aresta de menor custo",                     //0
                    "Se for marcada, forma ciclo?",                          //1
                    "     Forma, Não selecionar",                            //2
                    "     Não forma, Selecionar",                            //3
                    "Fim do algoritmo",                                      //4
                ];

            /**
             * @param  {Graph} graph The graph to be visited
             * @param  {Node} visited The initial node.
             */
            function run(graph, visited) {
                console.log('starting algorithm');
                resultado = [];
                var node = graph.getNode(visited);
                menorArvore(graph);
                console.log('end of algorithm');
                console.log(resultado);
                return resultado;
            }

            function menorArvore(G) {

                var fila = [];
                var resultadoFinal = [];

                //verifica se o grafo é desconexo ou direcionado
                  var conecti = G.getConexidade();
                  if(conecti.toString() == "c0" || G.isDirected()){

                    //se ele for desconexo mostra o toast de desconexo
                    if(conecti.toString() == "c0" ){
                        resultado.push({ operacao: 'tDesconexo'});
                    }else{//se ele for direcionado mostra o toast de direcionado
                      resultado.push({ operacao: 'tDirecionado'});
                    }
                  }else{
                    //caso não seja desconexo ou direcionado ele executa

                    //pega todas as arestas do grafo
                    var arests = G.getEdges();
                    var qtd = arests.length;
                    //criar vetor para armazenar as aretas do grafo
                    var arestas = [];
                    for(var i = 0;i<qtd;i++){
                      arestas.push(arests[i]);
                    }

                    //organiza as arestas por ordem de peso
                    arestas.sort(function(a, b) {
                      return (a.peso - b.peso);
                    })

                    console.log(arestas);

                    //define o vetor de vertices utilizados na arvore
                    var vertices = [];
                    //é colocado a origem da primeira aresta no vetor de vestices utilizados
                    vertices.push(arestas[0].source);

                    //loop para verificar todas as arestas
                    for(var i = 0; i<qtd ; i++){
                      resultado.push({passo: 0});
                      var aresta = arestas.shift();
                      // resultado.push({passo: 1});
                      resultado.push({ operacao: 'visit_link_nd', passo: 1, fila: fila, item: aresta});

                      //se a origem da aresta não consta no vetor de vertices da arvore
                      if(vertices.indexOf(aresta.source)===-1){
                        resultado.push({passo: 3});
                        console.log(aresta.source.label + " não encontrado no vetor");
                        vertices.push(aresta.source);
                        resultadoFinal.push(aresta.source);
                        resultadoFinal.push(aresta.target);
                        resultadoFinal.push(aresta);
                        //marca a aresta
                        resultado.push({ operacao: 'select_link_nd', passo: 0, fila: fila, item: aresta, resultado:resultadoFinal });
                      }else if(vertices.indexOf(aresta.target)===-1){//ou se o destino da aresta não consta no vetor de vertices da arvore
                        resultado.push({passo: 3});
                        console.log(aresta.target.label + " não encontrado no vetor");
                        vertices.push(aresta.target);
                        resultadoFinal.push(aresta.source);
                        resultadoFinal.push(aresta.target);
                        resultadoFinal.push(aresta);
                        //marca a aresta
                        resultado.push({ operacao: 'select_link_nd', passo: 0, fila: fila, item: aresta, resultado:resultadoFinal });
                      }else{
                        resultado.push({passo: 2});
                      }
                    }
                    resultado.push({passo: 4});
                  }//fim do else


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
                usaNada : true
            };

            return service;
        });
})();
