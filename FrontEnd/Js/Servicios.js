export async function Componentes(opciones) {
    try {
        const partesUrl = opciones.url.split('/');
        const nombreArchivo = partesUrl[partesUrl.length - 1];

        const ahora = new Date();
        const urlComponente = opciones.url + "/" + nombreArchivo;
        
        const urlSolicitud = window.location.origin + "/Invoxa/FrontEnd/" + urlComponente + ".html?a=" + ahora.getTime();
        const urlModulo = window.location.origin + "/Invoxa/FrontEnd/" + opciones.url + "/Methods/" + nombreArchivo + ".js?v=" + ahora.getTime();

        const respuesta = await fetch(urlSolicitud, {
            headers: {
                'pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'cache': 'no-store'
            }
        });
        
        const html = await respuesta.text();
        document.getElementById(opciones.parent).innerHTML = html;

        import(urlModulo)
            .then(modulo => {
                if (modulo.init) modulo.init();
            })
            .catch(err => {
                console.error("Fallo interno en el módulo:", urlModulo);
                console.error("Detalle del error:", err);
            });
            
        console.log("Funcionando:", nombreArchivo);
    } catch (error) {
        console.error("Error:", opciones.url, error);
    }
}