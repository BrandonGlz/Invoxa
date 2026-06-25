const Sql = require('../../Config/Sql')

const GraficaBarras = {
    ViewGraficaBarras: (callback) => {
        Sql.query('SELECT * FROM VW_Grafica_Barras', callback);
    }
};

module.exports = GraficaBarras;