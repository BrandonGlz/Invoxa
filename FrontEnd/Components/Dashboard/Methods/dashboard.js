const CONFIG = {
    metodo: 'GET',
    rutas: {
        kpis: 'http://localhost:3000/api/kpiFacturas',
        barras: 'http://localhost:3000/api/graficaBarras',
        pastel: 'http://localhost:3000/api/graficaPastel'
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
    
    // Si la API falla, inserta datos de prueba visuales temporalmente
    if (!data) {
        data = { total: 180, pendientes: 60, pagadas: 120, invertido: 1800 };
    }

    // Soporte para respuestas MySQL que devuelven arreglos [{ total: ... }]
    const info = Array.isArray(data) ? data[0] : data;

    if (info) {
        document.getElementById('kpi-total').textContent = info.total || 0;
        document.getElementById('kpi-pendientes').textContent = info.pendientes || 0;
        document.getElementById('kpi-pagadas').textContent = info.pagadas || 0;
        document.getElementById('kpi-invertido').textContent = `$${info.invertido || 0}`;
    }
};

const cargarGraficaBarras = async () => {
    let data = await consumirApi(CONFIG.rutas.barras);
    
    if (!data) {
        data = [
            { mes: 'Enero', cantidad: 120 }, { mes: 'Febrero', cantidad: 110 },
            { mes: 'Marzo', cantidad: 135 }, { mes: 'Abril', cantidad: 165 },
            { mes: 'Mayo', cantidad: 140 }
        ];
    }

    // Chart.js requiere un arreglo para mapear
    const listaDatos = Array.isArray(data) ? data : [data];

    const canvas = document.getElementById('graficaBarras');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: listaDatos.map(item => item.mes || item.nombre_mes || 'N/A'), 
            datasets: [{
                label: 'Facturas por mes',
                data: listaDatos.map(item => item.cantidad || item.total || 0), 
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
            { estado: 'Pagado', cantidad: 45 }, 
            { estado: 'Autorizado', cantidad: 25 }, 
            { estado: 'Pendiente', cantidad: 30 }
        ];
    }

    const listaDatos = Array.isArray(data) ? data : [data];

    const canvas = document.getElementById('graficaPastel');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: listaDatos.map(item => item.estado || item.status || 'N/A'),
            datasets: [{
                data: listaDatos.map(item => item.cantidad || item.total || 0),
                backgroundColor: ['#6dd69a', '#b78fd1', '#f5c065'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
};

const inicializarDashboard = async () => {
    // Retraso ligero para asegurar que el DOM inyectado exista
    setTimeout(async () => {
        await cargarKpis();
        await cargarGraficaBarras();
        await cargarGraficaPastel();
    }, 200);
};

inicializarDashboard();