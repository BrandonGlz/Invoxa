const Sql = require('../../Config/Sql');

const KpiFacturas = {
    KpiFacturas: (callback) => {
        Sql.query('SELECT * FROM VW_Dashboard_KPI', callback);
    }
};

module.exports = KpiFacturas;