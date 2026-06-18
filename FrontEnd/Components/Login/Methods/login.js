const procesarAutenticacion = async (usuario, password) => {
    try {
        const endpoint = 'http://localhost:3000/api/login'; 

        const peticion = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Se mantiene "contraseña" para asegurar compatibilidad con el backend
            body: JSON.stringify({ nombre: usuario, contraseña: password })
        });

        if (!peticion.ok) throw new Error("Fallo en la comunicación con el servidor de autenticación");

        const respuesta = await peticion.json();

        if (respuesta.length > 0 && respuesta[0].num) {
            sessionStorage.setItem('invoxa_session', respuesta[0].num);
            window.location.replace('/Invoxa/FrontEnd/index.html');
        } else {
            console.error("Acceso denegado: Credenciales inválidas o usuario inactivo.");
        }

    } catch (error) {
        console.error("[Auth Error]:", error);
    }
};

// Inicialización de eventos del DOM
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuario = document.getElementById('user').value;
            const password = document.getElementById('password').value;

            // Invocación de la función asíncrona aislada
            procesarAutenticacion(usuario, password);
        });
    }
});