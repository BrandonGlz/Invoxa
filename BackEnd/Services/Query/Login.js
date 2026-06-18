const Sql = require('../../Config/Sql');

const Login = {
    ValidarCredenciales: (nombre, contraseña, callback) => {
        const query = "SELECT num FROM USUARIO WHERE nombre = ? AND contraseña = ? AND estado = 'HAB'";
        Sql.query(query, [nombre, contraseña], callback);
    }
};

module.exports = Login;