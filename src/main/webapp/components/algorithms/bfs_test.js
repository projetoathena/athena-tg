/*globals module, inject*/

describe('Service: bfs', function () {
    'use strict';

    beforeEach(module('graphe'));

    var breadthFirstSearch,
        model,
        graph;

    beforeEach(inject(function (_bfs_, _model_) {
        breadthFirstSearch = _bfs_;
        model = _model_;

        graph = model.getGraph();
    }));

    it('deve retornar um array com o percurso em largura', function () {

        var a = {},
            b = {},
            c = {},
            d = {},
            e = {},
            f = {},
            g = {},
            h = {};


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

        var resultadoEsperado = [a,b,c,e,d,f,g,h];

        expect(breadthFirstSearch.run(graph, a)).toEqual(resultadoEsperado);
    });

    it('deve retornar um array com pelo menos um nó(o nó inicial)', function () {
        graph.addNode({id: 0});

        expect(breadthFirstSearch.run(graph, 0)).toEqual([{id: 0}]);
    });

});
