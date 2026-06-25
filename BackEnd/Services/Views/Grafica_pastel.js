const Sql = require('../../Config/Sql')

const GraficaPastel = {
    ViewGraficaPastel: (callback) => {
        Sql.query('SELECT * FROM VW_Grafica_Pastel', callback);
    }
};

module.exports = GraficaPastel;