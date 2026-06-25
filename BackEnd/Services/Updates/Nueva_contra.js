const Sql = require('../../Config/Sql');

const Nueva_contra = {
    ObtenerUsuarioPorCorreo: (correo, callback) => {
        const query = `
            SELECT p.num AS num_persona, u.num AS num_usuario, p.correo, u.nombre
            FROM PERSONA AS p
            INNER JOIN USUARIO AS u ON p.num = u.num
            WHERE p.correo = ?
        `;
        Sql.query(query, [correo], callback);
    },

    ActualizarContrasena: (numUsuario, nuevaContra, callback) => {
        const query = "UPDATE USUARIO SET contraseña = ? WHERE num = ?";
        Sql.query(query, [nuevaContra, numUsuario], callback);
    }
};

module.exports = Nueva_contra;