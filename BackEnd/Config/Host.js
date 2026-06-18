const express = require("express");
const cors = require("cors");
const path = require("path");
const Host = express();

//Habilitar CORS para peticiones cruzadas y parseo de cuerpos JSON
Host.use(cors());
Host.use(express.json());

// Definición de la ruta absoluta hacia el directorio del FrontEnd
const frontPath = path.join(__dirname, "../../FrontEnd");

// Servir archivos estáticos (CSS, JS, imágenes) desde la carpeta FrontEnd
Host.use(express.static(frontPath));

// Middleware de fallback para Single Page Application (SPA)
Host.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(frontPath, "index.html"));
});

module.exports = Host;