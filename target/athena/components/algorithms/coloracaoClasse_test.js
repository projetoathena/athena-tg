/*globals module, inject*/

describe('Service: coloracaoClasse', function () {
    'use strict';

    beforeEach(module('graphe'));

    var coloracaoClasse,
        model,
        grafo;

    beforeEach(inject(function (_coloracaoClasse_, _model_) {
        coloracaoClasse = _coloracaoClasse_;
        model = _model_;

        grafo = model.getGraph();
    }));

    it('deve retornar o conjunto C de cores', function () {

        var a = {},
            b = {},
            c = {},
            d = {},
            e = {};

        grafo.addNode(a);
        grafo.addNode(b);
        grafo.addNode(c);
        grafo.addNode(d);
        grafo.addNode(e);

        grafo.addEdge(a, b);
        grafo.addEdge(b, c);
        grafo.addEdge(c, d);
        grafo.addEdge(d, e);

        var resultadoEsperado = [
            [a,c,e],
            [b,d],
            [],
            [],
            []

        ];

        expect(coloracaoClasse.run(grafo)).toEqual(resultadoEsperado);
    });
});
