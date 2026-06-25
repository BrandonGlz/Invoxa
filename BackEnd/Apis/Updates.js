const Host = require('../Config/Host');

//Controllers
const  ActualizarContrasena  = require('../Controllers/Updates/Nueva_contra');

//Rutas
Host.use('/api/actualizarContrasena', ActualizarContrasena);

module.exports = Host;
