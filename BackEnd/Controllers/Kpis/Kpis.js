const express = require('express');
const Api = express.Router();
const KpiFacturas = require('../../Services/Kpis/Kpis');

Api.get('/', (req, res) => {
    KpiFacturas.KpiFacturas((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);