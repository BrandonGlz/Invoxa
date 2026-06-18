export async function Componentes(opciones) {
    try {
        //Extraer el nombre del archivo base a partir de la URL definida en el objeto de configuración
        const partesUrl = opciones.url.split('/');
        const nombreArchivo = partesUrl[partesUrl.length - 1];

        //Definición de parámetros para evitar caché del navegador mediante timestamp
        const ahora = new Date();
        const urlComponente = opciones.url + "/" + nombreArchivo;
        
        //Construcción de rutas absolutas para localizar recursos en el sistema de archivos del servidor
        const urlSolicitud = window.location.origin + "/Invoxa/FrontEnd/" + urlComponente + ".html?a=" + ahora.getTime();
        const urlModulo = window.location.origin + "/Invoxa/FrontEnd/" + urlComponente + ".js";

        //Fetch del contenido HTML con headers de control de caché estrictos
        const respuesta = await fetch(urlSolicitud, {
            headers: {
                'pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'cache': 'no-store'
            }
        });
        const html = await respuesta.text();
        
        //Esto inserta el código HTML recuperado directamente en el contenedor padre especificado por parámetro
        document.getElementById(opciones.parent).innerHTML = html;

        //Importación asíncrona del módulo JS para inicializar la lógica específica del componente
        import(urlModulo)
            .then(modulo => {
                //Ejecuta la función de inicialización si el módulo la exporta
                if (modulo.init) modulo.init();
            })
            .catch(() => {
                console.warn("No se encontró módulo para:", urlModulo);
            });
            
        //Registro de confirmación para depuración del ciclo de carga
        console.log("Funcionando:", nombreArchivo);
    } catch (error) {
        console.error("Error:", opciones.url, error);
    }
}