const CONFIG = {
    metodo: 'GET',
    rutas: {
        kpis: 'http://localhost:8000/api/kpis/facturas/',
        barras: 'http://localhost:8000/api/kpis/barras/',
        pastel: 'http://localhost:8000/api/kpis/pastel/'
    }
};

const consumirApi = async (url) => {
    try {
        const peticion = await fetch(url, {
            method: CONFIG.metodo,
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!peticion.ok) throw new Error(`HTTP Error: ${peticion.status}`);
        
        const respuestaCruda = await peticion.text();
        return JSON.parse(respuestaCruda);
    } catch (error) {
        console.error(`Fallo crítico al consumir ${url}:`, error);
        return null;
    }
};

const cargarKpis = async () => {
    let data = await consumirApi(CONFIG.rutas.kpis);
    
    if (!data) {
        data = { total_facturas: 0, facturas_pendientes: 0, facturas_pagadas: 0, dinero_invertido: 0 };
    }

    const info = Array.isArray(data) ? data[0] : data;

    if (info) {
        document.getElementById('kpi-total').textContent = info.total_facturas || 0;
        document.getElementById('kpi-pendientes').textContent = info.facturas_pendientes || 0;
        document.getElementById('kpi-pagadas').textContent = info.facturas_pagadas || 0;
        document.getElementById('kpi-invertido').textContent = `$${info.dinero_invertido || 0}`;
    }
};

const cargarGraficaBarras = async () => {
    let data = await consumirApi(CONFIG.rutas.barras);
    
    if (!data) {
        data = [
            { mes: 'Enero', cantidad_facturas: 0 },
            { mes: 'Febrero', cantidad_facturas: 0 },
            { mes: 'Marzo', cantidad_facturas: 0 }
        ];
    }

    const listaDatos = Array.isArray(data) ? data : [data];

    const canvas = document.getElementById('graficaBarras');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: listaDatos.map(item => item.mes || 'N/A'),
            datasets: [{
                label: 'Facturas por mes',
                data: listaDatos.map(item => item.cantidad_facturas || 0),
                backgroundColor: '#386bc0',
                borderRadius: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
};

const cargarGraficaPastel = async () => {
    let data = await consumirApi(CONFIG.rutas.pastel);
    
    if (!data) {
        data = [
            { estado_factura: 'Sin datos', cantidad_facturas: 0 }
        ];
    }

    const listaDatos = Array.isArray(data) ? data : [data];

    const canvas = document.getElementById('graficaPastel');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: listaDatos.map(item => item.estado_factura || 'N/A'),
            datasets: [{
                data: listaDatos.map(item => item.cantidad_facturas || 0),
                backgroundColor: ['#6dd69a', '#b78fd1', '#f5c065'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
};

const inicializarDashboard = async () => {
    setTimeout(async () => {
        await cargarKpis();
        await cargarGraficaBarras();
        await cargarGraficaPastel();
    }, 200);
};

inicializarDashboard();