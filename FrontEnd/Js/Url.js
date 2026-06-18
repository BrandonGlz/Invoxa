export var Url = {
    //Ruta base para las peticiones al backend
    api: '/api/',
    
    load: {
        components: [
            { parent: 'sidemenu', url: 'Components/sidemenu' },
            { parent: 'header', url: 'Components/header' },
            { parent: 'ventas', url: 'Components/dashboard' },
            { parent: 'ganancias', url: 'Components/facturas' },
            { parent: 'facturas', url: 'Components/reportes' },
            { parent: 'inventario', url: 'Components/proveedores' },
            { parent: 'usuarios', url: 'Components/usuarios' },
            { parent: 'historial', url: 'Components/historial' }
        ]
    }
};