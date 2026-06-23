import { Componentes } from "./Servicios.js";
import { Url } from "./Url.js";

//Validar existencia de sesión en sessionStorage, si no existe, redirige a login y aborta el script
const sessionActiva = sessionStorage.getItem('invoxa_session');
if (!sessionActiva) {
    window.location.replace('/Invoxa/FrontEnd/Components/login/login.html');
    //Esto detiene la ejecución del bloque de código para evitar carga de vistas no autorizadas
    throw new Error("Sin sesión activa. Deteniendo carga del sistema.");
}

//Escuchar evento de carga de página para inicializar la interfaz base
window.addEventListener("load", async () => {
    const componentesPorDefecto = ['header', 'sidemenu', 'dashboard'];

    for (const id of componentesPorDefecto) {
        let componente = Url.load.components.find(c => c.parent === id);

        if (!componente) {
            console.warn("Componente no encontrado:", id);
            continue;
        }

        //Redirigir el renderizado del dashboard al contenedor principal de contenido
        if (id === 'dashboard') {
            componente = { ...componente, parent: 'content' };
        }

        //Renderizar componente en el DOM
        await Componentes(componente);
    }
});

//Método para cargar componentes de forma dinámica mediante eventos de usuario
export function cargarComponente(nombre) {
    let componente = Url.load.components.find(c => c.parent === nombre);

    //Si no hay coincidencia exacta por ID, busca por nombre de URL
    if (!componente) {
        componente = Url.load.components.find(c => c.url.includes(nombre));
        //Si se encuentra, fuerza la inyección del componente en el contenedor principal
        if (componente) componente = { ...componente, parent: 'content' };
    }

    if (componente) {
        Componentes(componente);
    } else {
        console.warn("Componente no encontrado:", nombre);
    }
}