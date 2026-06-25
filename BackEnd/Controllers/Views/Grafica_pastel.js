const express = require('express');
const Api = express.Router();
const GraficaPastel = require('../../Services/Views/Grafica_pastel');

Api.get('/', (req, res) => {
    GraficaPastel.ViewGraficaPastel((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);