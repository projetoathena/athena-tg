(function () {
    'use strict';
    angular.module('graphe.algorithms')
        .service('caminhoMinimo', function () {

            /**
             * Percurso em largura, adaptado de handbook of graph theory
             * 2.1.2
             * @type {string}
             */

            var nome = 'Caminho Mínimo',
                instrucoes = [],
                resultado = [],
                passos = [
                  "Preencher a matriz principal com os vertices",                           //0
                  "Preencher a matriz principal com os custo ∞",                            //1
                  "Preencher a matriz principal com os antecessores -1",                    //2
                  "Preencher a matriz principal com o fechamento 0",                        //3
                  "Definir o vertice inicial e atualiza a tabela e fechamento",             //4
                  "    Acha-se o vértice aberto mais próximo da origem",                    //5
                  "    O vértice mais próximo da origem é fechado",                         //6
                  "    Para todos os sucessores ainda abertos",                             //7
                  "        Se (custo(origem) + custo(origem -> sucessor)) < custo atual)",  //8
                  "        Custo atual = (custo(origem) + custo(origem -> destino))",       //9
                  "Fim do Algoritmo",                                                       //10
              ];

            /**
             * @param  {Graph} graph The graph to be visited
             * @param  {Node} visited The initial node.
             */
            function run(graph, visited) {
                console.log('starting algorithm');
                resultado = [];
                var node = graph.getNode(visited);
                caminhoMinimo(graph, node);
                console.log('end of algorithm');
                console.log(resultado);
                return resultado;
            }


            function caminhoMinimo(G, IniFim) {

                if(!G.isDirected()){
                  var lines = G.getEdges();
                  var temp = [];
                  lines.forEach(function(line){
                    var id = G.addReverseEdge(line.source, line.target, line.peso);
                    console.log(id);
                    temp.push(id);
                  });
                }

                console.log(IniFim[0]);
                console.log(IniFim[1]);
                var verticeInicial = IniFim[0];
                var verticeFinal = IniFim[1];

                var testeNos = G.getNodes();
                var fila = [];
                var resultadoFinal = [];

                console.log(G);

                //var matrix = criaMatrizAdj();

                console.log("teste matrix:");
                var testeMatrix = G.getAdjacencyMatrix();
                console.log(testeMatrix);

                console.log("teste nos:");
                console.log(testeNos);

                //Criação da matriz principal
                var matrixPrinci = new Array(4);
                for(var i = 0; i< matrixPrinci.length ; i++){
                  matrixPrinci[i] = new Array(testeNos.length);
                }

                //Preenchimento da matriz principal com os Objetos dos nos/vertices, custos, antecessores e fechamento.
                for(var i = 0; i< testeNos.length ; i++){
                  matrixPrinci[0][i] = testeNos[i];
                  matrixPrinci[1][i] = Number.POSITIVE_INFINITY;
                  matrixPrinci[2][i] = -1;
                  matrixPrinci[3][i] = 0;
                }
                console.log(matrixPrinci);
                resultado.push({ operacao: '', passo: 0, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });
                resultado.push({ operacao: '', passo: 1, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });
                resultado.push({ operacao: '', passo: 2, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });
                resultado.push({ operacao: '', passo: 3, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });


                //verifica o indice do vertice inicial
                var indiceInicial = matrixPrinci[0].indexOf(verticeInicial);
                console.log("index inicial: " + indiceInicial);

                //Define a distanica e o anterior e fecha o vertice inicial
                matrixPrinci[1][indiceInicial] = 0;
                matrixPrinci[2][indiceInicial] = matrixPrinci[0][indiceInicial];
                matrixPrinci[3][indiceInicial] = 1;
                resultado.push({ operacao: '', passo: 4, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });

                var antecessor = matrixPrinci[0][indiceInicial];
                fila.push(antecessor);
                resultado.push({ operacao: 'visitar_no', passo: 5, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });
                resultado.push({ operacao: 'marcar_no', passo: 6, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });

                for(var j = 0; j < testeNos.length-1; j++){
                    //Pega os sucessores do vertice antecessor
                    var sucessores = G.getSucessores(antecessor);
                    console.log(sucessores);
                    resultado.push({ operacao: '', passo: 7, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });

                    //verifica as distancias para Preenchimento na matriz principal
                    for(var i = 0; i < sucessores.length; i++){
                      var indiceAnt = matrixPrinci[0].indexOf(antecessor);
                      var custoAntecessor =  matrixPrinci[1][indiceAnt];
                      var sucessor = G.getNode(sucessores[i]);
                      var indiceVert = matrixPrinci[0].indexOf(sucessor);
                      var distancia = G.getEdge(antecessor,sucessor);
                      console.log("distancia do " + antecessor.label + " até o " + sucessor.label + " = " + distancia.peso);

                      resultado.push({ operacao: '', passo: 8, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });
                      if(matrixPrinci[3][indiceVert] == 0 && matrixPrinci[1][indiceVert] > (parseInt(distancia.peso)+custoAntecessor)){
                        console.log("valor alterado de " + matrixPrinci[1][indiceVert] + " para " + (parseInt(distancia.peso)+custoAntecessor));
                        resultado.push({ operacao: '', passo: 9, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });
                        matrixPrinci[1][indiceVert] = (parseInt(distancia.peso)+custoAntecessor);
                        matrixPrinci[2][indiceVert] =  antecessor;
                      }
                    }

                    //verifica o vertice de menor custo e fecha na matriz Principal
                    var menorCusto = Number.POSITIVE_INFINITY;
                    var indiceMenorCusto = -1;
                    for(var i = 0; i < testeNos.length; i++){
                      if(matrixPrinci[3][i] == 0 && matrixPrinci[1][i] <= menorCusto){
                        menorCusto = matrixPrinci[1][i];
                        indiceMenorCusto = i;
                      }
                    }
                    matrixPrinci[3][indiceMenorCusto] = 1;
                    console.log("menor distancia é a do vertice " + matrixPrinci[0][indiceMenorCusto].label + " que é de " + menorCusto);

                    //define o antecessor para a verificação
                    antecessor = matrixPrinci[0][indiceMenorCusto];
                    fila.push(antecessor);
                    resultado.push({ operacao: 'visitar_no', passo: 5, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });
                    resultado.push({ operacao: 'marcar_no', passo: 6, fila: fila, item: antecessor, resultado:resultadoFinal.slice() });

                    console.log("Fim do ciclo " + (j+1));
                    console.log(matrixPrinci);
                }

                var solution = [];

                var aux = verticeFinal;
                var indexAux = matrixPrinci[0].indexOf(aux);

                resultadoFinal.push(aux);
                resultado.push({ operacao: 'colorir_no', passo: 10, fila: fila, item: {
                    vertice: aux,
                    cor : 1
                }, resultado:resultadoFinal });

                var indexIni = matrixPrinci[0].indexOf(verticeInicial);

                while(indexAux != indexIni){
                  aux = matrixPrinci[2][indexAux];
                  indexAux = matrixPrinci[0].indexOf(aux);
                  aux = matrixPrinci[0][indexAux];
                  resultadoFinal.push(aux);
                  resultado.push({ operacao: 'colorir_no', passo: 10, fila: fila, item: {
                      vertice: aux,
                      cor : 1
                  }, resultado:resultadoFinal });
                }

                resultadoFinal = resultadoFinal.reverse();
                resultado.push({ operacao: '', passo: 10, fila: fila, item: antecessor, resultado:resultadoFinal });

                for(var count = 1; count < resultadoFinal.length; count++){
                  var texte = G.getEdge(resultadoFinal[count-1],resultadoFinal[count]);
                  if(!G.isDirected()){
                      resultado.push({ operacao: 'select_link_nd', passo: 10, fila: fila, item: texte, resultado:resultadoFinal });
                      var texte1 = G.getEdge(texte.target,texte.source);
                      resultado.push({ operacao: 'select_link_nd', passo: 10, fila: fila, item: texte1, resultado:resultadoFinal });
                  }else{
                      resultado.push({ operacao: 'select_link', passo: 10, fila: fila, item: texte, resultado:resultadoFinal });
                  }
                }

                console.log(resultadoFinal[0]);
                if(!G.isDirected()){
                  for(var i = 0; i<temp.length;i++){
                    G.removeLinkId(temp[i]);
                  }
                }
                console.log(G.getEdges());

                // for(var count = 1; count < resultadoFinal.length; count++){
                //   resultado.push({ operacao: 'deselect_link', passo: 10, fila: fila, item: texte, resultado:resultadoFinal });
                // }

                // verticeInicial.marcado = true;
                // resultado.push({ operacao: 'visitar_no', passo: 0, fila: fila, item: verticeInicial, resultado:resultadoFinal.slice() });
                // resultado.push({ operacao: 'marcar_no', passo: 1, fila: fila, item: verticeInicial, resultado:resultadoFinal.slice() });
                //
                // // Adiciona à fila
                // fila.push(verticeInicial);
                // resultado.push({ operacao: '', passo: 2, fila: fila.slice(), resultado:resultadoFinal.slice() });

                // while (fila.length > 0) {
                //     resultado.push({ operacao: '', passo: 3, fila: fila.slice(), resultado:resultadoFinal.slice() });
                //     //Pega primeiro item da fila
                //     var n = fila.shift();
                //     resultadoFinal.push(n);
                //     resultado.push({ operacao: '', passo: 4, fila: fila.slice(), resultado:resultadoFinal.slice()  });
                //
                //
                //     G.getAdjacencyList(n).forEach(function(m){
                //         resultado.push({ operacao: '', passo: 5, fila: fila.slice(),resultado: resultadoFinal.slice() });
                //         if (!m.marcado) {
                //             m.marcado = true;
                //             resultado.push({ operacao: 'visitar_no', passo: 6, fila:fila.slice(), item:m, resultado:resultadoFinal.slice() });
                //             fila.push(m);
                //             resultado.push({ operacao: '', passo: 7, fila:fila.slice(), resultado:resultadoFinal.slice() });
                //             resultado.push({ operacao: 'marcar_no', passo: 8, fila:fila.slice(), item:m,resultado:resultadoFinal.slice() });
                //         }
                //     });
                // }


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
                usaLista : true
            };

            return service;
        });
})();
