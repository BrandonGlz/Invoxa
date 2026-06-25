const express = require('express');
const Api = express.Router();
const GraficaBarras = require('../../Services/Views/Grafica_barras');

Api.get('/', (req, res) => {
    GraficaBarras.ViewGraficaBarras((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);