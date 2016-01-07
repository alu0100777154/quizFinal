var Quiz = require('../models/quiz_model.js');

var quiz = new Quiz();
var current = quiz.randomQuestion();

exports.index = function (req, res, next) {
    res.render('index', {title: 'Quiz'});
};

exports.question = function (req, res) {
    current = quiz.randomQuestion();
    res.render('quizes/question', {pregunta: current.pregunta});
};

exports.answer = function (req, res) {
    var c = 'Incorrecto';
    if (current.respuesta(req.query.respuesta)) {
        c = 'Correcto';
    }
    res.render('quizes/answer', {respuesta: c});
};

exports.preguntas = function (req, res) {
    var n = quiz.numQ();
    var array = new Array(n);

    for (var i = 0; i < n; i++)
        array[i] = quiz.getQ(i);

    res.render('quizes/preguntas', {lista: array});
};


exports.pregunta = function (req, res) {
    var id = req.params.id;
    var n = quiz.numQ();

    if (id < 1 || id > n)
        res.render('quizes/pregunta', {prg: "No existe esa pregunta."});

    else {
        current = quiz.q[id - 1];

        res.render('quizes/question', {pregunta: current.pregunta});
    }
};