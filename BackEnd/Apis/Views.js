const Host = require('../Config/Host');

//Controllers
const Ganancias = require('../Controllers/Views/Ganancias');

//Rutas
Host.use('/api/ganancias', Ganancias);

module.exports = Host;