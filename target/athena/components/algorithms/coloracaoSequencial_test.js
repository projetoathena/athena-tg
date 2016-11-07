/*globals module, inject*/

describe('Service: coloracaoSequencial', function () {
    'use strict';

    beforeEach(module('graphe'));

    var coloracaoSequencial,
        model,
        grafo;

    beforeEach(inject(function (_coloracaoSequencial_, _model_) {
        coloracaoSequencial = _coloracaoSequencial_;
        model = _model_;
        grafo = model.getGraph();
    }));

    xit('deve retornar o conjunto C de cores', function () {


    });


});
