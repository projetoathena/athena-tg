(function () {
    'use strict';

    angular.module('graphe.algorithms')
        .service('caminhoMinimo', function () {

            var n = 'Caminho Mínimo',
                instructions = [],
                //result = [],
                resultado = [],
                steps = [
                    "passo 1",
                    "passo 2",
                    "passo 3",
                    "passo 4",
                    "passo 4",
                    "passo 6",
                    "passo 7",
                    "passo 8",
                    "passo 9",
                    "passo 10"
                ];

            /**
             *
             * @param graph
             * @param visited
             * @returns {Array}
             */
            function run(graph) {
                console.log('Início: caminho mínimo');
                caminhoMinimo(graph);
                console.log('Fim: caminho mínimo');
                console.log(resultado);
                return resultado;
            }

            function criaMatrizAdj (){
              var matriz = document.querySelector(".adjacency-matrix");
              matriz = matriz.querySelector("table");
              matriz = matriz.querySelector("tbody");
              var itens  = matriz.querySelectorAll("td");

              console.log(itens);

              var txt = [];

              itens.forEach( function(item){
                txt.push(item.textContent.toString());
              });

              for(var i = 0; i < 30;i++){
                var a = txt.indexOf(String.fromCharCode((65+i)));
                if(a === -1){break;}
                txt.splice(a,1);
              }

              console.log(txt);

              var contador = Math.sqrt(txt.length);

              var matrix = new Array(contador);
              for(var i = 0; i< contador ; i++){
                matrix[i] = new Array(contador);
              }

              for(var col = 0; col< contador ; col++){
                for(var lin = 0; lin< contador ; lin++){
                  var x = parseInt(txt.shift());
                  if(x == 0){
                    matrix[col][lin] = Number.POSITIVE_INFINITY;
                  }else{
                    matrix[col][lin] = x;
                  }
                }
              }

              console.log(matrix);

              return matrix;

            }

            function caminhoMinimo(G) {

                var nos = G.getNodes();
                var C = [];
                var i;
                var k;
                resultado = [];

                var matrix = criaMatrizAdj();

                for(i = 0; i < nos.length; i++ ){
                    resultado.push({ operacao: '', passo: 0, resultado: angular.copy(C)});
                    C[i] = [];
                    resultado.push({ operacao: '', passo: 1, resultado: angular.copy(C)});
                }
                resultado.push({ operacao: '', passo: 2, resultado: angular.copy(C)});

                resultado.push({ operacao: '', passo: 3, resultado: angular.copy(C)});

                for(i = 0, k = 0; i < nos.length; i++ ){
                    resultado.push({ operacao: 'marcar_no', passo: 4, item: nos[i], resultado: angular.copy(C)});

                    var vizinhos = G.getVizinhos(nos[i]);

                    for(var atribuido = false; atribuido !== true;){
                        resultado.push({ operacao: '', passo: 5, resultado: angular.copy(C)});

                        var contem = false;

                        // verifica se algum dos vizinhos já esta no conjunto
                        // de cores
                        C[k].forEach(function (cor) {
                            vizinhos.forEach(function (vizinho) {
                                if (vizinho === cor) {
                                    contem = true;
                                }
                            });
                        });


                        if(contem){
                            resultado.push({ operacao: '', passo: 8, resultado: angular.copy(C)});
                            k++;
                            resultado.push({ operacao: '', passo: 9, resultado: angular.copy(C)});
                        }
                        else{
                            resultado.push({ operacao: '', passo: 6, resultado: angular.copy(C)});
                            C[k].push(nos[i]);
                            resultado.push({ operacao: 'colorir_no', passo: 7, item: {
                                vertice: nos[i],
                                cor : k
                            }, resultado: angular.copy(C)});

                            atribuido = true;
                        }
                        resultado.push({ operacao: '', passo: 10, resultado: angular.copy(C)});
                    }
                    resultado.push({ operacao: '', passo: 11, resultado: angular.copy(C)});
                    resultado.push({ operacao: '', passo: 12, resultado: angular.copy(C)});
                }
                resultado.push({ operacao: '', passo: 13, resultado: angular.copy(C)});
                resultado.push({ operacao: '', passo: 14, resultado: angular.copy(C)});

            }

            //noinspection UnnecessaryLocalVariableJS
            var service = {
                name: n,
                steps: steps,
                result: resultado,
                instructions: instructions,
                run: run,
                usaCores : true
            };

            return service;

        });
})();
