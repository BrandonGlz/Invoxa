const mysql = require('mysql2');

// Detectamos si estamos en Render
const isRender = process.env.RENDER === "true";

let Sql = null;

if (!isRender) {
  // Conexión a MySQL local
  Sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'invoxa_db'
  });

  Sql.connect((err) => {
    if (err) {
      console.log("Error al conectar a MySQL:", err);
    } else {
      console.log("Conectado a MySQL (local)");
    }
  });
} else {
  //Render no tiene MySQL local
  console.log("Base de datos desactivada en Render (modo pruebas)");
}

module.exports = Sql;
