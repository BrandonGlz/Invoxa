const Host = require('../Config/Host');

//Controllers
const GraficaPastel = require('../Controllers/Views/Grafica_pastel');
const GraficaBarras = require('../Controllers/Views/Grafica_barras');

//Rutas
Host.use('/api/graficaPastel', GraficaPastel);
Host.use('/api/graficaBarras', GraficaBarras);

module.exports = Host;