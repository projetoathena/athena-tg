(function() {
    'use strict';
    angular
        .module('graphe.directives')
        .directive('gpContainer', gpContainer)
        .controller('gpContainerCtrl', gpContainerCtrl);

    function gpContainer() {
        return {
            controller: 'gpContainerCtrl',
            restrict: 'A'
        };
    }

    function gpContainerCtrl($rootScope, $scope, $window, model, labels) {
        var vm = this;

        init();

        console.log('gpcontainerctrl init');

        $scope.currentOption = undefined;
        $scope.isFabOpen = false;
        $scope.selectedColumn = null;
        // The stage dimensions
        $scope.width = 0;
        $scope.height = 0;
        $scope.selectedNode = null;

        $scope.setSelectedNode = setSelectedNode;
        $scope.matrix = $scope.graph.getAdjacencyMatrix();
        $scope.adjacencyList = $scope.graph.getAdjacencyMatrix();
        $scope.$watch('scope.graph.getAdjacentMatrix()', updateMatrix);
        $scope.$watch('scope.graph.getAdjacentList()', updateAdjacencyList);




        angular.element($window).on('resize', function(){
            console.log('rescaling');
            rescaleGraph();
        });


        // functions
        vm.getCurrentOption = getCurrentOption;
        vm.updateNodeCount = updateNodeCount;
        vm.setSelectedOption = setSelectedOption;
        vm.showNodeEditDialog = $scope.showNodeEditDialog;
        vm.showLinkEditDialog = $scope.showLinkEditDialog;
        vm.showNewGraphDialog = $scope.showNewGraphDialog;
        vm.showNodeInfoDialog = $scope.showNodeInfoDialog;
        vm.setSelectedNode = setSelectedNode;

        rescalePanels();

        function setSelectedNode(node){
            $scope.selectedNode = node;
        }

        function setSelectedOption(option) {
            $scope.cancel();
            $scope.fab.currentOption = option;
            $scope.showFab = false;
            $scope.showContextToolbar();
        }

        function rescalePanels() {
            // get the width of graph-stage element and set to the graph element itself
            var graphStageDiv = $('#gp-stage-container');
            $scope.width = graphStageDiv.width();
            $scope.height= graphStageDiv.height();

            var mdcontent = $('#mdcontent');

            $scope.mdcontent = mdcontent.width() + ',' + mdcontent.height();
        }

        function updateNodeCount (){
            //console.log('updating node count');
            $scope.graph.nodes = $scope.graph.getNodes();
            $scope.graph.links = $scope.graph.getEdges();
        }

        function init(){}

        function getCurrentOption(){
            return $scope.currentOption;
        }

        function updateMatrix(){
            $scope.matrix = $scope.graph.getAdjacencyMatrix();
        }

        function updateAdjacencyList(){
            $scope.adjacencyList = $scope.graph.getAdjacencyList();
        }

        function rescaleGraph () {
            rescalePanels();

            var dimensions = {
                width: $scope.width,
                height: $scope.height
            };

            console.log('emiting resized');

            $rootScope.$broadcast('window.resized' , dimensions);
        }
    }

})();