(function () {
    'use strict';
    angular.module('graphe.model')
        .service('labels', labels);

    function labels() {

        var letter = 'A';

        function nextChar(c) {
            return String.fromCharCode(c.charCodeAt(0) + 1);
        }

        function getLetter() {
            var temp = letter;
            letter = nextChar(letter);
            return temp;
        }

        function restart() {
            letter = 'A';
        }

        //noinspection UnnecessaryLocalVariableJS
        var service = {
            nextChar: nextChar,
            getLetter: getLetter,
            restart: restart
        };

        return service;
    }
})();