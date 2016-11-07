(function () {
    'use strict';

    angular.module('graphe.algorithms')
        .service('coloracaoSequencial', function () {

            var n = 'Coloração sequencial',
                instructions = [],
                //result = [],
                resultado = [],
                steps = [
                    "para i ← 1 até n faça",                        //0
                    "       Ci ← Ø",                                //1
                    "fim-para",                                     //2
                    "k ← 1",                                        //3
                    "para i ← 1 até n faça",                        //4
                    "     enquanto não atribuir i a Ck faça",       //5
                    "         se N(i) ∩ Ck = Ø",                    //6
                    "            Ck = Ck ∪ {i}",                    //7
                    "         senão",                               //8
                    "            k ← k + 1;",                       //9
                    "         fim-se",                              //10
                    "       fim-enquanto",                          //11
                    "   k ← 1",                                     //12
                    "fim-para",                                     //13
                    "fim do algoritmo"                              //14
                ];

            /**
             *
             * @param graph
             * @param visited
             * @returns {Array}
             */
            function run(graph) {
                console.log('iniciando coloração sequencial');
                coloracaoSequencial(graph);
                console.log('fim: coloração sequencial');
                console.log(resultado);
                return resultado;
            }


            function coloracaoSequencial(G) {

                var nos = G.getNodes();
                var C = [];
                var i;
                var k;
                resultado = [];

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
                usaCores: true
            };

            return service;

        });
})();