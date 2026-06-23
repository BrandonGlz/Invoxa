const procesarAutenticacion = async (usuario, password) => {
    try {
        const endpoint = 'http://localhost:3000/api/login'; 
        const contenedorError = document.getElementById('div-error-login');
        
        if (contenedorError) {
            contenedorError.textContent = '';
        }

        const peticion = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: usuario, contraseña: password })
        });

        if (!peticion.ok) throw new Error("Fallo en la comunicación con el servidor de autenticación");

        const respuesta = await peticion.json();

        if (respuesta.length > 0 && respuesta[0].num) {
            sessionStorage.setItem('invoxa_session', respuesta[0].num);
            window.location.replace('/Invoxa/FrontEnd/index.html');
        } else {
            if (contenedorError) {
                contenedorError.textContent = "Acceso denegado: Credenciales inválidas o usuario inactivo.";
            }
        }

    } catch (error) {
        const contenedorError = document.getElementById('div-error-login');
        if (contenedorError) {
            contenedorError.textContent = "Ocurrió un error al procesar la solicitud de acceso.";
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('frm-login');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuario = document.getElementById('inp-usuario').value;
            const password = document.getElementById('inp-password').value;

            procesarAutenticacion(usuario, password);
        });
    }
});