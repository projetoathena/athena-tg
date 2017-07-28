(function () {
    'use strict';
    /**
     * gpAlgorithmPlayer
     *
     * Directive to control the algorithm execution, gives a interface to communication
     * through the gpAlgorithmPlayerCtrl
     */

    angular.module('graphe.directives')
        .directive('gpAlgorithmPlayer', ['dfs','bfs','coloracaoSequencial', 'coloracaoClasse','caminhoMinimo', 'menorArvore', gpAlgorithmPlayer])
        .controller('gpAlgorithmPlayerCtrl', gpAlgorithmPlayerCtrl);

    function gpAlgorithmPlayer() {
        return {
            restrict: 'E',
            require: ['^gpContainer', '^?gpStage'],
            controller: 'gpAlgorithmPlayerCtrl'
        };
    }

    function gpAlgorithmPlayerCtrl($scope, $interval, dfs,bfs, coloracaoSequencial, coloracaoClasse,caminhoMinimo, menorArvore, broadcastService) {

        var timerAlgoritmo;

        $scope.$watch('algoritmoSelecionado', function(){

            console.log('mudou selecionado');

            $scope.pilha = [];
            $scope.fila = [];
            $scope.passoAtual = -1;
            $scope.resultado = [];
            $scope.emExecucao = false;
        });

        $scope.steps = [];
        $scope.selectedStep = -1;

        $scope.algorithms = [
            dfs,
            bfs,
            coloracaoSequencial,
            coloracaoClasse,
            caminhoMinimo,
            menorArvore
        ];

        $scope.pilha = [];
        $scope.fila = [];
        $scope.passoAtual = -1;
        $scope.resultado = [];

        $scope.emExecucao = false;

        $scope.algoritmoSelecionado = $scope.algorithms[0];
        var counter = 0;
        var resultado = [];

        $scope.runAlg = run;

        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $scope.cancelTimer();
        });

        $scope.cancelTimer = function(){
            if (angular.isDefined(timerAlgoritmo)) {
                $scope.emExecucao = false;
                console.log('cancelando timer');
                console.log($interval.cancel(timerAlgoritmo));
                timerAlgoritmo = undefined;
            }
        };

        $scope.startTimer = function(){
            var intervalo = 250;
            $scope.cancelTimer();
            timerAlgoritmo = $interval(proximoPasso, intervalo);
            $scope.emExecucao = true;
        };

        function proximoPasso(){

            if(counter < resultado.length){
                var operacao = resultado[counter];
                if(operacao.operacao !== ''){
                    broadcastService.broadcast(operacao.operacao, operacao.item);
                }

                if(operacao.pilha !== undefined){

                $scope.pilha = operacao.pilha.map(function(element){
                    return element.label;
                });
                }

                if(operacao.fila !== undefined) {
                    $scope.fila = operacao.fila.map(function (element) {
                        return element.label;
                    });
                }

                $scope.passoAtual = operacao.passo;

                //mapeia a array bidimensional de rotulos de cores
                if($scope.algoritmoSelecionado.usaCores !== undefined){

                    if(operacao.resultado !== undefined) {
                        $scope.resultado = operacao.resultado.map(function (element) {
                            return element.map(function(el){
                                return el.label;
                            });
                        });
                    }
                }
                else if(operacao.resultado !== undefined) {
                    $scope.resultado = operacao.resultado.map(function (element) {
                        return element.label;
                    });
                }
                counter++;
            }
            else {
                $scope.cancelTimer();
                broadcastService.broadcast('clean_all_nodes');
            }
        }

        function run() {

            console.log('executando algoritmo');

            if($scope.emExecucao){
                $scope.cancelTimer();
            }

            else {
                if(counter < resultado.length){
                    $scope.startTimer();
                }

                else{
                    counter = 0;
                    if($scope.algoritmoSelecionado.usaCores || $scope.algoritmoSelecionado.usaNada){
                        broadcastService.broadcast('clean_all_nodes');
                        resultado = $scope.algoritmoSelecionado.run($scope.graph);
                        $scope.startTimer();
                    }else if ($scope.algoritmoSelecionado.usaLista) {
                      $scope.showEndDialog(function (IniFim) {
                          broadcastService.broadcast('clean_all_nodes');
                          resultado = $scope.algoritmoSelecionado.run($scope.graph,IniFim);
                          $scope.startTimer();
                      });
                    }else{
                        $scope.showDialog(function (startNode) {
                            broadcastService.broadcast('clean_all_nodes');
                            resultado = $scope.algoritmoSelecionado.run($scope.graph, startNode);
                            $scope.startTimer();
                        });
                    }
                }
            }
        }
    }
})();
