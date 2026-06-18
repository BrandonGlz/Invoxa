const Host = require('../Config/Host');

//Controllers
const Facturas = require('../Controllers/Kpis/Facturas');

//Rutas
Host.use('/api/gananciasFacturas', Facturas);

module.exports = Host;