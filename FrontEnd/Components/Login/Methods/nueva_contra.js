const procesarActualizacion = async (correo, codigo, nuevaContra) => {
    try {
        const endpoint = 'http://localhost:3000/api/actualizarContrasena';
        const contenedorError = document.getElementById('div-error-recuperar');
        if (contenedorError) contenedorError.textContent = '';
        const peticion = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, codigo, nuevaContra })
        });
        if (!peticion.ok) {
            const errorData = await peticion.json();
            if (contenedorError) contenedorError.textContent = errorData.mensaje || "Error en la validación.";
            return;
        }
        const respuesta = await peticion.json();
        if (respuesta.exito) {
            sessionStorage.removeItem('invoxa_recovery_email');
            window.location.replace('/Invoxa/FrontEnd/Components/Login/login.html');
        }
    } catch (error) {
        const contenedorError = document.getElementById('div-error-recuperar');
        if (contenedorError) contenedorError.textContent = "Fallo en la comunicación con el servidor.";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const formRecuperar = document.getElementById('frm-recuperar');
    if (formRecuperar) {
        formRecuperar.addEventListener('submit', (e) => {
            e.preventDefault();
            const codigo = document.getElementById('inp-validacion-cod').value.trim();
            const nuevaContra = document.getElementById('inp-nueva').value.trim();
            const correo = sessionStorage.getItem('invoxa_recovery_email');
            if (!correo) {
                const contenedorError = document.getElementById('div-error-recuperar');
                if (contenedorError) contenedorError.textContent = "Sesión inválida. Vuelve a solicitar el código.";
                return;
            }
            if (codigo !== '' && nuevaContra !== '') {
                procesarActualizacion(correo, codigo, nuevaContra);
            }
        });
    }
});