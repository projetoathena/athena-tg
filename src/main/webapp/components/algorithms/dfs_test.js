/*globals module, inject*/

describe('Service: dfs', function () {

    'use strict';

    beforeEach(module('graphe'));

    var depthFirstSearch,
        model,
        graph;

    beforeEach(inject(function (_dfs_, _model_) {
        depthFirstSearch = _dfs_;
        model = _model_;

        graph = model.getGraph();
    }));


    it('deve retornar um array com o percurso em profundidade em um grafo não direcionado', function () {

        var a = {},
            b = {},
            c = {},
            d = {};

        graph.setDirected(false);

        graph.addNode(a);
        graph.addNode(b);
        graph.addNode(c);
        graph.addNode(d);

        graph.addEdge(a, b);
        graph.addEdge(a, c);

        graph.addEdge(b, d);
        graph.addEdge(c, d);

        var resultadoEsperado = [a,b,d,c];

        expect(depthFirstSearch.run(graph, 0)).toEqual(resultadoEsperado);
    });

    it('deve retornar um array com o percurso em profundidade em um grafo direcionado', function () {

        var a = {label:'a'},
            b = {label:'b'},
            c = {label:'c'},
            d = {label:'d'},
            e = {label:'e'},
            f = {label:'f'},
            g = {label:'g'},
            h = {label:'h'};

        graph.addNode(a);
        graph.addNode(b);
        graph.addNode(c);
        graph.addNode(d);
        graph.addNode(e);
        graph.addNode(f);
        graph.addNode(g);
        graph.addNode(h);

        graph.addEdge(a,b);
        graph.addEdge(a,c);
        graph.addEdge(a,e);

        graph.addEdge(b,d);
        graph.addEdge(b,e);

        graph.addEdge(c,f);
        graph.addEdge(c,g);

        graph.addEdge(d,h);

        graph.addEdge(e,h);

        graph.addEdge(f,e);
        graph.addEdge(f,g);

        graph.addEdge(g,h);



        var resultadoEsperado = [a,b,d,h,e,c,f,g];

        expect(depthFirstSearch.run(graph, 0)).toEqual(resultadoEsperado);
    });

    it('deve retornar um array com pelo menos um nó (o nó inicial)', function () {
        graph.addNode({id: 0});
        expect(depthFirstSearch.run(graph, 0)).toEqual([{id: 0}]);
    });

});
