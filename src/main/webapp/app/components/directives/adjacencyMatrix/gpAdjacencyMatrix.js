(function () {
    'use strict';
    /**
     * gpAdjascentMatrix
     *
     * Directive to display the adjacency matrix
     */
    angular.module('graphe.directives')
        .directive('gpAdjacencyMatrix', ['broadcastService', gpAdjacencyMatrix]);

    function gpAdjacencyMatrix(broadcastService) {

        function draw(scope, element) {

            if(scope.graph.getNodes().length === 0){
                return;
            }

            var columns = [];

            scope.graph.getNodes().forEach(function (node) {
                //console.log(node);
                columns.push(node.label);
            });

            angular.element(element[0]).empty().addClass('adjacency-matrix');

            var tabela = d3.select(element[0]).append('table'),
                thead = tabela.append('thead'),
                tbody = tabela.append('tbody');

            function mouseEnterCell(d, i) {
                d3.selectAll('.adjcol' + i).classed('highlight-cell', true);
                scope.$apply(function(){
                    broadcastService.broadcast('select_node',i);
                });

                //console.log('mouseover: ' + i);
            }

            function mouseLeaveCell(d, i) {
                d3.selectAll('.adjcol' + i).classed('highlight-cell', false);
                //console.log('mouseleave: ' + i);
                scope.$apply(function(){
                    broadcastService.broadcast('deselect_node',i);
                });
            }

            function mouseEnterRow(d, i) {
                d3.selectAll('.adjrow' + i).classed('highlight-cell', true);
                scope.$apply(function(){
                    broadcastService.broadcast('select_node',i);
                });
            }

            function mouseLeaveRow(d, i) {
                d3.selectAll('.adjrow' + i).classed('highlight-cell', false);
                scope.$apply(function(){
                    broadcastService.broadcast('deselect_node',i);
                });
            }

            thead.append('tr')
                .selectAll('th')
                .data(columns)
                .enter()
                .append('th')
                .text(function (d) {
                    return d;
                })
                .attr('class', function (d, i) {
                    return 'adjcol' + i;
                });

            thead
                .select('tr')
                .insert("th", "th");
//                .on('mouseenter', mouseEnterCell)
  //             .on('mouseleave', mouseLeaveCell);

            tbody
                .selectAll('tr')
                .data(scope.graph.getAdjacencyMatrix())
                .enter()
                .append('tr')
                .attr('class', function (d, i) {
                    return 'adjrow' + i;
                })
                //.on('mouseenter', mouseEnterRow)
                //.on('mouseleave', mouseLeaveRow)
                .selectAll('td')
                .data(function (d) {
                    return d;
                })
                .enter()
                .append('td')
                .text(function (d) {
                    return d;
                })
                .attr('class', function (d, i) {
                    return 'adjcol' + i;
                });

            tbody
                .selectAll('tr')
                .data(scope.graph.getNodes())
                .insert('td', "td")
                .text(function(d){
                    return d.label;
                })
                .classed('bold', true);
              // .on('mouseenter', mouseEnterCell)
              // .on('mouseleave', mouseLeaveCell);
        }

        function postLink(scope, element) {

            draw(scope, element);
            scope.$watch('graph.getAdjacencyMatrix()', function () {



                draw(scope, element);
            },true);

            scope.$on('update_matrix', function(){

                console.log('listen update matrix');
                //console.log(scope.graph.getAdjacencyMatrix());

                draw(scope, element);
            });
        }

        return {
            templateUrl: 'app/components/directives/adjacencyMatrix/gpAdjacencyMatrix.tpl.html',
            restrict: 'E',
            require: ['^gpContainer', '^?gpStage'],
            link: postLink
        };
    }
})();