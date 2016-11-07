/*globals module, inject*/

describe('Service: model', function () {

    'use strict';

    beforeEach(module('graphe'));

    var model;
    beforeEach(inject(function (_model_) {
        model = _model_;
    }));

    describe('Instantiation', function () {
        it('should instantiate a new Graph', function () {
            var graph = model.getGraph();
            expect(graph).toBeDefined();
        });

        it('should instantiate two different graphs', function () {
            var graph = model.getGraph(5);
            var graph2 = model.getGraph(5);
            expect(graph).not.toEqual(graph2);
        });
    });

    describe("The instantiated graph", function () {
        var graph;

        beforeEach(function () {
            graph = model.getGraph();
            graph.setDirected(true);
        });

        it("should be created with an empty vertice list", function () {
            expect(graph.getNodes().length).toBe(0);
        });

        it("should be created with an empty edge list", function () {
            expect(graph.getEdges().length).toBe(0);
        });

        it("should start with an empty adjacency matrix", function () {
            expect(graph.getAdjacencyMatrix().length).toBe(0);
        });

        it("should allow add a vertice to the graph", function () {
            graph.addNode({});
            expect(graph.getNodes().length).toBe(1);
        });

        it("should allow remove a vertice from the graph", function () {
            graph.addNode({});
            expect(graph.getNodes().length).toBe(1);

            graph.removeNode(0);
            expect(graph.getNodes().length).toBe(0);
        });



        it("should allow get a vertice by id", function () {
            graph.addNode({});
            expect(graph.getNode(0)).toBeDefined();
        });

        /**
         * TODO : verificar
         * model pode ter dois vértices(para calculo da lista/matrix de adjacencia), mas só deve aparecer um
         * quando exibir via d3js
         */
        xit("should allow connect two nodes with one edge", function () {

            var a = {label:'a'},
                b = {label:'b'};

            graph.addNode(a);
            graph.addNode(b);

            graph.addEdge(a, b);

            expect(graph.getNodes().length).toBe(2);

            expect(graph.getEdges()).toEqual([{
                source: a,
                target: b
            }]);

            console.log(graph.getEdges());

            expect(graph.getEdges().length).toBe(1);
        });

        it("should allow to get a edge passing two nodes by id", function () {
            graph.addNode({});
            graph.addNode({});

            graph.addEdge(0, 1);

            expect(graph.getEdge(0,1)).toBeDefined();

        });

        it("should allow to get a edge passing two nodes by reference", function () {

            var nodeA = {};
            var nodeB = {};

            graph.addNode(nodeA);
            graph.addNode(nodeB);

            graph.addEdge(nodeA, nodeB);

            expect(graph.getEdge(nodeA,nodeB)).toBeDefined();

        });

        it("should allow to get a edge passing two nodes by id", function () {

            var nodeA = {};
            var nodeB = {};

            graph.addNode(nodeA);
            graph.addNode(nodeB);

            graph.addEdge(nodeA.id, nodeB.id);

            expect(graph.getEdge(nodeA.id,nodeB.id)).toBeDefined();

        });

        it("should allow get the adjacency matrix", function () {
            var a = {};
            var b = {};
            graph.addNode(a);
            graph.addNode(b);

            graph.addEdge(a, b);

            expect(graph.getAdjacencyMatrix()).toEqual([[0, 1], [0, 0]]);

        });

        it("should allow get the adjacency list by index", function () {
            var a = {};
            var b = {};
            var c = {};
            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);

            graph.addEdge(a, b);
            graph.addEdge(a, c);

            expect(graph.getAdjacencyList(0)).toEqual([{id:1},{id:2}]);

        });

        it("should allow get the adjacency list by reference", function () {
            var a = {};
            var b = {};
            var c = {};
            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);

            graph.addEdge(0, 1);
            graph.addEdge(0, 2);

            expect(graph.getAdjacencyList({id:0})).toEqual([{id:1},{id:2}]);

        });

        it("deve permitir obter os sucessores de um vértice", function(){

            var a = {};
            var b = {};
            var c = {};
            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);

            graph.addEdge(0, 1);
            graph.addEdge(1, 2);

            expect(graph.getSucessores(a)).toEqual([b]);

        });

        it("deve permitir obter os antecessores de um vértice", function(){

            var a = {};
            var b = {};
            var c = {};
            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);

            graph.addEdge(0, 2);
            graph.addEdge(1, 2);

            expect(graph.getAntecessores(c)).toEqual([a,b]);

        });


        it("deve permitir obter os vizinhos de um vértice", function(){

            var a = {};
            var b = {};
            var c = {};
            var d = {};
            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);
            graph.addNode(d);

            graph.addEdge(a, b);
            graph.addEdge(b, c);
            graph.addEdge(d, b);

            expect(graph.getVizinhos(b)).toEqual([c,a,d]);

        });


        it("deve permitir remover uma aresta", function () {

            var a = {label:'a'},
                b = {label:'b'},
                c = {label:'c'},
                d = {label:'d'},
                e = {label:'e'};

            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);
            graph.addNode(d);
            graph.addNode(e);

            graph.addEdge(a, b);
            graph.addEdge(b, c);
            graph.addEdge(c, a);
            graph.addEdge(b, d);
            graph.addEdge(d, e);

            var resultadoEsperado = [
                graph.getEdge(a,b),
                graph.getEdge(b,c),
                graph.getEdge(c,a),
                graph.getEdge(d,e)
            ];

            graph.removeEdge(b, d);

            expect(graph.getEdges()).toEqual(resultadoEsperado);
        });



        it("should allow remove a edge by reference", function () {

            var a = {id: 0};
            var b = {id: 1};

            graph.addNode(a);
            graph.addNode(b);

            graph.addEdge(0, 1);

            graph.removeEdge(a, b);

            expect(graph.getEdges().length).toBe(0);
        });

        it("should allow add edges for nodes by reference", function () {

            var a = {id: 0},
                b = {id: 1};

            graph.addNode(a);
            graph.addNode(b);

            graph.addEdge(a, b);

            expect(graph.getEdges().length).toBe(1);
        });


        it("should allow only one edge between two nodes in the same direction", function () {

            var a = {id: 0},
                b = {id: 1};

            graph.addNode(a);
            graph.addNode(b);

            graph.addEdge(a, b);
            graph.addEdge(a, b);
            graph.addEdge(a, b);

            expect(graph.getEdges().length).toBe(1);

        });

        it("pode ser direcionado ou não", function () {

            expect(graph.isDirected() === true);

            graph.setDirected(false);

            expect(graph.isDirected() === false);

        });


        it("deve atualizar a lista de adjacencia corretamente ao remover uma aresta", function () {

            var a = {},
                b = {},
                c = {},
                d = {};


            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);
            graph.addNode(d);

            expect(graph.getNodes().length).toBe(4);


            graph.addEdge(a,b);
            graph.addEdge(b,c);
            graph.addEdge(d,c);
            graph.addEdge(d,a);
            graph.addEdge(d,b);


            expect(graph.getEdges().length).toBe(5);

            expect(graph.getAdjacencyList()).toEqual([
                [b],
                [c],
                [],
                [c,a,b]
            ]);

            graph.removeEdge(b,c);

            expect(graph.getAdjacencyList()).toEqual([
                [b],
                [],
                [],
                [c,a,b]
            ]);
        });




        it("deve atualizar a lista de adjacencia corretamente ao remover um vertice", function () {

            var a = {},
                b = {},
                c = {},
                d = {};


            graph.addNode(a);
            graph.addNode(b);
            graph.addNode(c);
            graph.addNode(d);

            expect(graph.getNodes().length).toBe(4);

            graph.addEdge(a,b);
            graph.addEdge(b,c);
            graph.addEdge(d,c);
            graph.addEdge(d,a);
            graph.addEdge(d,b);

            expect(graph.getEdges().length).toBe(5);

            expect(graph.getAdjacencyList()).toEqual([
                [b],
                [c],
                [],
                [c,a,b]
            ]);

            graph.removeNode(b);

            expect(graph.getAdjacencyList()).toEqual([
                [],
                [],
                [c,a]
            ]);

            graph.removeNode(a);

            expect(graph.getAdjacencyList()).toEqual([
                [],
                [c]
            ]);
        });

    });
});
