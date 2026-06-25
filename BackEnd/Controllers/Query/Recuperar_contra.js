const express = require('express');
const Api = express.Router();
const Recuperar_contra = require('../../Services/Query/Recuperar_contra');
const codigosRecuperacion = require('../../Config/ConfigStore');
const { enviarCodigo } = require('../../Config/Mailer');

Api.post('/', (req, res) => {
    const { correo } = req.body;

    Recuperar_contra.ValidarCorreo(correo, async (error, resultado) => {
        if (error) {
            console.log(error);
            return res.status(500).send();
        }

        if (resultado && resultado.length > 0) {
            const codigo = Math.floor(10000 + Math.random() * 90000).toString();
            
            codigosRecuperacion.set(correo, codigo);

            try {
                await enviarCodigo(correo, codigo);
                res.json(resultado);
            } catch (mailError) {
                console.log(mailError);
                res.status(500).json();
            }
        } else {
            res.json(resultado);
        }
    });
});

module.exports = Api;