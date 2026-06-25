const Sql = require('../../Config/Sql');

const Recuperar_contra = {
    ValidarCorreo: (correo, callback) => {
        const query = "SELECT num FROM PERSONA WHERE correo = ?";
        Sql.query(query, [correo], callback);
    }
};

module.exports = Recuperar_contra;