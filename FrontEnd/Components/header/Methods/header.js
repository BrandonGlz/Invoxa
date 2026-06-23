import { Componentes } from "../../../Js/Servicios.js";

export const init = () => {
    const btnPerfil = document.getElementById('btn-perfil-toggle');
    const dropdownPerfil = document.getElementById('dropdown-perfil');

    if (!btnPerfil || !dropdownPerfil) return;

    btnPerfil.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownPerfil.classList.toggle('activo');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownPerfil.contains(e.target) && !btnPerfil.contains(e.target)) {
            dropdownPerfil.classList.remove('activo');
        }
    });

    const enlacesNavegacion = dropdownPerfil.querySelectorAll('.dropdown-item:not(.logout)');
    
    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', async (e) => {
            e.preventDefault();

            // Extrae el identificador limpio, ej. "perfil" o "configuracion"
            const nombreDestino = enlace.getAttribute('href').replace('#', '');

            // Construye la ruta asumiendo que las carpetas se llaman igual que el destino
            const ruta = {
                nombre: nombreDestino,
                parent: "content", 
                url: `Components/${nombreDestino}` 
            };

            try {
                await Componentes(ruta);

                const modulo = document.querySelector("#h-modulo");
                if (modulo) {
                    modulo.textContent = `Módulo de ${nombreDestino.charAt(0).toUpperCase() + nombreDestino.slice(1)}`;
                }

                dropdownPerfil.classList.remove('activo');

            } catch (err) {
                console.error("Error al cargar componente desde el header:", ruta.url, err);
            }
        });
    });
};