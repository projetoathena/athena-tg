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

                    //define o vetor de vertices e suas arvores
                    var vert = G.getNodes();
                    var vertices = new Array(2);
                    vertices[0] = new Array(vert.length);//array aonde vão estar os vertices
                    vertices[1] = new Array(vert.length);//array aonde vão estar as arvores
                    for(var i = 0; i < vert.length; i++){
                      vertices[0][i] = vert[i];
                      vertices[1][i] = i;
                    }


                    //loop para verificar todas as arestas
                    for(var i = 0; i<qtd ; i++){
                      resultado.push({passo: 0});
                      var aresta = arestas.shift();
                      // resultado.push({passo: 1});
                      resultado.push({ operacao: 'visit_link_nd', passo: 1, fila: fila, item: aresta});
                      console.log("verificando indice de " + aresta.source.label);
                      var partida = vertices[0].indexOf(aresta.source);//verifica o indice do vartice de origem no vetor de vertices
                      console.log("indice no vetor de vertices: " + partida);
                      console.log(vertices[0][partida]);

                      console.log("verificando indice de " + aresta.target.label);
                      var chegada = vertices[0].indexOf(aresta.target);//verifica o indice do vartice de destino no vetor de vertices
                      console.log("indice no vetor de vertices: " + chegada);
                      console.log(vertices[0][chegada]);

                      //verifica se as arvores dos vertices são diferentes
                      if(vertices[1][partida] !== vertices[1][chegada]){
                        console.log(vertices[1][partida] +"!==" + vertices[1][chegada]);
                        //altera a arvore do vertice destino da aresta para a arvore do vertice de origem
                        vertices = alteraArvore(vertices,vertices[1][partida],vertices[1][chegada]);
                        resultadoFinal.push(aresta.source);
                        resultadoFinal.push(aresta.target);
                        resultadoFinal.push(aresta);
                        //marca a aresta
                        resultado.push({ operacao: 'select_link_nd', passo: 0, fila: fila, item: aresta, resultado:resultadoFinal });
                      }else{
                        console.log(vertices[1][partida] +"=" + vertices[1][chegada]);
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

        //função para alteração das arvores
        function alteraArvore (lista,de,para){
          for (var i = 0; i < lista[1].length; i++) {
            if(lista[1][i] === para){
              lista[1][i] = de;
            }
          }
          return lista;
        }
})();
