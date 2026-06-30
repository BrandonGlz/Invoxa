const procesarRecuperacion = async (correo) => {
    try {
        const endpoint = 'http://localhost:8000/api/recuperar-password/';
        const contenedorError = document.getElementById('div-error-recuperar');
        if (contenedorError) contenedorError.textContent = '';
        const peticion = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: correo })
        });
        if (!peticion.ok) {
            if (peticion.status === 404) {
                if (contenedorError) contenedorError.textContent = "No se encontró una cuenta asociada a este correo.";
            } else {
                if (contenedorError) contenedorError.textContent = "Error en la comunicación con el servidor.";
            }
            return;
        }
        const respuesta = await peticion.json();
        if (respuesta.length > 0 && respuesta[0].num) {
            sessionStorage.setItem('invoxa_recovery_email', correo);
            window.location.replace('/Invoxa/FrontEnd/Components/Login/nueva_contra.html');
        } else {
            if (contenedorError) contenedorError.textContent = "Acceso denegado.";
        }
    } catch (error) {
        const contenedorError = document.getElementById('div-error-recuperar');
        if (contenedorError) contenedorError.textContent = "Ocurrió un error al procesar la solicitud.";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const formRecuperar = document.getElementById('frm-recuperar');
    if (formRecuperar) {
        formRecuperar.addEventListener('submit', (e) => {
            e.preventDefault();
            const correo = document.getElementById('inp-correo').value.trim();
            if(correo !== '') {
                procesarRecuperacion(correo);
            }
        });
    }
});