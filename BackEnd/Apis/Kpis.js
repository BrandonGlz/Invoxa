const Host = require('../Config/Host');

//Controllers
const KpiFacturas = require('../Controllers/Kpis/Kpis');

//Rutas
Host.use('/api/kpiFacturas', KpiFacturas);

module.exports = Host;