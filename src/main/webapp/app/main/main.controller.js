(function () {
    'use strict';

    angular
        .module('graphe')
        .controller('MainCtrl', [
                      '$scope', '$mdSidenav', '$mdToast', '$mdDialog', '$location', 'fab', 'broadcastService', 'toast', 'model',
            function ( $scope,   $mdSidenav,   $mdToast,   $mdDialog,   $location,   fab,   broadcastService,   toast,   model) {

                $scope.appName = "Athena";

                $scope.rotuloObr = true;

                $scope.contador = 0;

                $scope.isShowContextToolbar = false;
                $scope.fab = fab;
                $scope.showFab = true;

                // Functions
                $scope.showHelp = showHelp;

                $scope.showContextToolbar = showContextToolbar;
                $scope.hideContextToolbar = hideContextToolbar;
                $scope.toggleSidenav = toggleSidenav;
                $scope.go = go;
                $scope.cancel = cancel;
                $scope.message = '';

                $scope.showDialog = showDialog;
                $scope.showNodeEditDialog = showNodeEditDialog;
                $scope.showLinkEditDialog = showLinkEditDialog;
                $scope.showNewGraphDialog = showNewGraphDialog;

                $scope.showNodeInfoDialog = showNodeInfoDialog;

                $scope.graph = model.getGraph();
                $scope.graph.setDirected(true);

                // nova mensagem de contexto
                $scope.$on('new_message',function(){
                    $scope.message = broadcastService.object;
                });


                function showHelp() {
                    toast.showSimpleToast($scope.fab.currentOption.message);
                }

                function showContextToolbar() {
                    $scope.isShowContextToolbar = true;
                }

                function hideContextToolbar() {
                    $scope.isShowContextToolbar = false;
                    $scope.hideFab = false;
                }

                function toggleSidenav(menuId) {
                    $mdSidenav(menuId).toggle();
                }

                /**
                 * Executa a mudança de página
                 * @param url destino
                 * @param hide ocultar menu lateral
                 */
                function go(url, hide) {

                    if($location.path() === "/graph" && url === "/graph"){
                        console.log('novo grafo');

                        $scope.showNewGraphDialog();
                    }

                    $location.path(url);

                    if (hide) {
                        $scope.toggleSidenav('left');
                    }
                }

                function cancel() {
                    $scope.hideContextToolbar();
                    $scope.message = '';
                    $scope.fab.currentOption = {};
                    $scope.showFab = true;
                }


                function showNodeEditDialog(node, action) {

                    if($scope.fab.currentOption != {}){
                        $scope.cancel();
                    }
                    $scope.selectedNodeToEdit = node;

                    $mdDialog.show({
                        controller: NodeEditDialogController,
                        // use parent scope
                        scope: $scope,
                        preserveScope: true,
                        templateUrl: '../../app/components/directives/container/nodeEditDialog.tpl.html',
                        parent: angular.element(document.body),
                        targetEvent: null,
                        clickOutsideToClose: false
                    }).then(
                        // on sucess
                        function () {


                        },
                        // on error
                        function () {}
                    );
                }

                //TODO: atualizar apenas quando der ok?
                function NodeEditDialogController($scope, $mdDialog) {

                    $scope.cancelarNodeEdit = cancelarNodeEdit;
                    $scope.answerNodeEdit = answerNodeEdit;

                    $scope.radius = $scope.selectedNodeToEdit.radius;
                    $scope.color = $scope.selectedNodeToEdit.color || d3.rgb(255, 255, 255);
                    $scope.label = $scope.selectedNodeToEdit.label || 'Rótulo';
                    $scope.r = $scope.selectedNodeToEdit.color.r;
                    $scope.g = $scope.selectedNodeToEdit.color.g;
                    $scope.b = $scope.selectedNodeToEdit.color.b;


                    function cancelarNodeEdit() {
                        if($scope.selectedNodeToEdit.label != undefined){
                            $scope.selectedNodeToEdit.color.b = $scope.b;
                            $scope.selectedNodeToEdit.color.g = $scope.g;
                            $scope.selectedNodeToEdit.color.r = $scope.r;
                            $scope.selectedNodeToEdit.label = $scope.label;
                            $scope.selectedNodeToEdit.radius = $scope.radius;
                            $mdDialog.cancel();
                        }
                    };

                    function answerNodeEdit(valido) {
                        if(valido){
                            $mdDialog.hide(valido);
                        }else{
                            toast.showSimpleToast("Verifique o formulário, há erros !");
                        }
                    };
                }


                /**
                 * Dialogo de selecao de nó para execucao de algoritmo
                 * @param action
                 */
                function showDialog(action) {

                    $scope.selectedNodeToRun = null;

                    $mdDialog.show({
                        controller: DialogController,
                        // use parent scope
                        scope: $scope,
                        preserveScope: true,
                        templateUrl: '../../app/components/directives/container/selectNodeDialog.tpl.html',
                        parent: angular.element(document.body),
                        targetEvent: null,
                        clickOutsideToClose: true
                    })
                        .then(
                        // on sucess
                        function () {
                            action($scope.selectedNodeToRun);
                        },
                        // on error
                        function () {
                            $scope.status = 'Execução de algoritmo cancelada.';
                        });
                }

                function DialogController($scope, $mdDialog) {

                    $scope.hide = function () { $mdDialog.hide(); };

                    $scope.cancelDialog = function () {
                        $mdDialog.cancel();
                    };

                    $scope.answerDialog = function (answer) {
                        $mdDialog.hide(answer);
                    };
                }


                /**
                 *  Diálogo de edição de arestas
                 */
                function showLinkEditDialog(link, action) {

                    if($scope.fab.currentOption != {}){
                        $scope.cancel();
                    }

                    $scope.selectedLink = link;

                    $mdDialog.show({
                        controller: LinkEditDialogController,
                        // use parent scope
                        scope: $scope,
                        preserveScope: true,
                        templateUrl: '../../app/components/directives/container/linkEditDialog.tpl.html',
                        parent: angular.element(document.body),
                        targetEvent: null,
                        clickOutsideToClose: false
                    }).then(
                        // on sucess
                        function () { action(); },
                        // on error
                        function () {}
                    );
                }

                function LinkEditDialogController($scope, $mdDialog) {

                    $scope.cancelLinkEdit = cancelLinkEdit;
                    $scope.invertLink = invertLink;

                    $scope.selectedLink.peso = $scope.selectedLink.peso || 1;
                    $scope.peso = $scope.selectedLink.peso;
                    $scope.source = $scope.selectedLink.source;
                    $scope.target = $scope.selectedLink.target;

                    $scope.linkDirecaoContraria = undefined;


                    $scope.$watch('selectedLink', function(){

                        $scope.linkDirecaoContraria = $scope.graph.getEdge($scope.selectedLink.target, $scope.selectedLink.source);

                        if($scope.linkDirecaoContraria !== undefined){
                            $scope.linkDirecaoContraria.peso = $scope.selectedLink.peso;
                        }

                        $scope.graph.updateAdjacencyMatrix();

                        broadcastService.broadcast('update_stage');
                        broadcastService.broadcast('update_matrix');
                    }, true);

                    function invertLink(){

                        var source = $scope.selectedLink.source;
                        var target = $scope.selectedLink.target;
                        var peso = $scope.selectedLink.peso;

                        $scope.graph.removeEdge(source,target);
                        $scope.graph.addEdge(target,source);

                        $scope.selectedLink = $scope.graph.getEdge(target,source);
                        $scope.selectedLink.peso = peso;

                        console.log('invertendo link');

                        console.log($scope.graph.getAdjacencyList());

                        broadcastService.broadcast('update_stage');
                        broadcastService.broadcast('update_matrix');
                        $scope.contador++;
                    };

                    function cancelLinkEdit() {
                        $scope.selectedLink.peso = $scope.peso;
                        if($scope.contador % 2 == 1){
                            invertLink();
                        }
                            $mdDialog.cancel();
                    };

                    $scope.answerLinkEdit = function (answer) {
                        $mdDialog.hide(answer);
                    };
                }

                /**
                 *  Diálogo de edição de arestas
                 */
                function showNewGraphDialog() {

                    $mdDialog.show({
                        controller: NewGraphDialogController,
                        // use parent scope
                        scope: $scope,
                        preserveScope: true,
                        templateUrl: '../../app/components/directives/container/newGraphDialog.tpl.html',
                        parent: angular.element(document.body),
                        targetEvent: null,
                        clickOutsideToClose: true
                    }).then(
                        // on sucess
                        function (direcionado) {
                            $scope.graph = model.getGraph();
                            $scope.graph.setDirected(direcionado === 'digraph');
                        },
                        // on error
                        function () {}
                    );
                }

                function NewGraphDialogController($scope, $mdDialog) {

                    $scope.direcionado = true;

                    $scope.cancelNewGraph = function () {
                        $mdDialog.cancel();
                    };

                    $scope.answerNewGraph = function (answer) {
                        $mdDialog.hide(answer);
                    };
                }



                function showNodeInfoDialog(node) {

                    $scope.selectedNodeToInfo = node;

                    $mdDialog.show({
                        controller: InfoDialogController,
                        // use parent scope
                        scope: $scope,
                        preserveScope: true,
                        templateUrl: '../../app/components/directives/container/infoDialog.tpl.html',
                        parent: angular.element(document.body),
                        targetEvent: null,
                        clickOutsideToClose: true
                    }).then(
                        // on sucess
                        function () {},
                        // on error
                        function () {}
                    );
                }

                function InfoDialogController($scope, $mdDialog) {

                    $scope.cancelNodeInfo = function () {
                        $mdDialog.cancel();
                    };

                    $scope.answerNodeInfo = function (answer) {
                        $mdDialog.hide(answer);
                    };
                }





            }]);



})();