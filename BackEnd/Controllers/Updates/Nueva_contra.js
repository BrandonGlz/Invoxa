const express = require('express');
const Api = express.Router();
const Nueva_contra = require('../../Services/Updates/Nueva_contra');
const codigosRecuperacion = require('../../Config/ConfigStore');

Api.post('/', (req, res) => {
    const { correo, codigo, nuevaContra } = req.body;

    if (!correo || !codigo || !nuevaContra) {
        return res.status(400).json({ exito: false, mensaje: "Datos incompletos." });
    }

    const codigoGuardado = codigosRecuperacion.get(correo);

    if (!codigoGuardado || codigoGuardado !== codigo) {
        return res.status(401).json({ exito: false, mensaje: "Código de validación incorrecto o expirado." });
    }

    Nueva_contra.ObtenerUsuarioPorCorreo(correo, (error, resultados) => {
        if (error) {
            console.error("Fallo en SELECT ObtenerUsuarioPorCorreo:", error);
            return res.status(500).json({ exito: false, mensaje: "Error de consulta en el servidor." });
        }

        if (resultados && resultados.length > 0) {
            const numUsuario = resultados[0].num_usuario;

            Nueva_contra.ActualizarContrasena(numUsuario, nuevaContra, (errUpdate, resUpdate) => {
                if (errUpdate) {
                    console.error("Fallo en UPDATE ActualizarContrasena:", errUpdate);
                    return res.status(500).json({ exito: false, mensaje: "Error al escribir los cambios en la base de datos." });
                }

                codigosRecuperacion.delete(correo);
                return res.status(200).json({ exito: true, mensaje: "Contraseña actualizada exitosamente." });
            });
        } else {
            return res.status(404).json({ exito: false, mensaje: "Identificador de usuario no encontrado." });
        }
    });
});

module.exports = Api;