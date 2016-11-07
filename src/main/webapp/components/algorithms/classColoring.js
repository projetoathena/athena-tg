(function () {
    'use strict';

    angular.module('graphe.algorithms')
        .service('coloracaoClasse', function () {

            var n = 'Coloração por classe',
                instructions = [],
                resultado = [],
                steps = [
                    "para i ← 1 até n faça",
                    "       Ci ← Ø",
                    "fim-para",
                    "Y ← X",
                    "k ← 1;",
                    "enquanto Y != Ø faça",
                    "       para xi E Y faça",
                    "               se N(xi) ∩ Ck = Ø",
                    "                       Ck ← Ck ∪ {xi}",
                    "                       Y ← Y - {xi}",
                    "               fim-se",
                    "       fim-para",
                    "       k ← k + 1",
                    "fim-enquanto",
                    "fim do algoritmo"
                ];

            function run(graph) {
                console.log('iniciando coloração por classe');
                coloracaoClasse(graph);
                console.log('fim: coloração por classe');
                return resultado;
            }


            function coloracaoClasse(G) {

                resultado = [];

                var nos = G.getNodes();
                var C = [];
                var i;

                for(i = 0; i < nos.length; i++ ){
                    resultado.push({ operacao: '', passo: 0, resultado: angular.copy(C)});
                    C[i] = [];
                    resultado.push({ operacao: '', passo: 1, resultado: angular.copy(C)});
                }
                resultado.push({ operacao: '', passo: 2, resultado: angular.copy(C)});

                var Y = nos.slice();
                resultado.push({ operacao: '', passo: 3, resultado: angular.copy(C), fila: angular.copy(Y)});
                var k = 0;
                resultado.push({ operacao: '', passo: 4, resultado: angular.copy(C), fila: angular.copy(Y)});

                while(Y.length > 0){

                    resultado.push({ operacao: '', passo: 5, resultado: angular.copy(C), fila: angular.copy(Y)});

                    for(i = 0; i < Y.length; i++ ){
                        resultado.push({ operacao: 'marcar_no', item: Y[i], passo: 6, resultado: angular.copy(C), fila: angular.copy(Y)});

                        var vizinhos = G.getVizinhos(Y[i]);
                        var contem = false;
                        // verifica se algum dos vizinhos já esta no conjunto de cores
                        C[k].forEach(function (cor) {

                            vizinhos.forEach(function (vizinho) {
                                if (vizinho === cor) {
                                    contem = true;
                                }
                            });
                        });


                        if(!contem){
                            resultado.push({ operacao: '', passo: 7, resultado: angular.copy(C), fila: angular.copy(Y)});
                            C[k].push(Y[i]);
                            resultado.push({ operacao: 'colorir_no', passo: 8, resultado: angular.copy(C), fila: angular.copy(Y),
                            item:{
                                vertice: Y[i],
                                cor : k
                            }});
                            //sempre usar -- ao se fazer o splice, necessário porque o comprimento de Y será reduzido
                            Y.splice(i--,1);
                            resultado.push({ operacao: '', passo: 9, resultado: angular.copy(C), fila: angular.copy(Y)});
                        }
                        resultado.push({ operacao: '', passo: 10, resultado: angular.copy(C), fila: angular.copy(Y)});
                    }
                    resultado.push({ operacao: '', passo: 11, resultado: angular.copy(C), fila: angular.copy(Y)});
                    k++;
                    resultado.push({ operacao: '', passo: 12, resultado: angular.copy(C), fila: angular.copy(Y)});
                }
                resultado.push({ operacao: '', passo: 13, resultado: angular.copy(C), fila: angular.copy(Y)});
                resultado.push({ operacao: '', passo: 14, resultado: angular.copy(C), fila: angular.copy(Y)});
                //return resultado;
            }

            //noinspection UnnecessaryLocalVariableJS
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

        });
})();