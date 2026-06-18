const express = require('express');
const Api = express.Router();
const Login = require('../../Services/Query/Login');

Api.post('/', (req, res) => {
    const { nombre, contraseña } = req.body;

    Login.ValidarCredenciales(nombre, contraseña, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);

