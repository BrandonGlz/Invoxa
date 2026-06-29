import { Componentes } from "../../../Js/Servicios.js"; 
//import { nombreMetodo } from "../../dashboard/Methods/dashboard.js";

const rutas = [
    { nombre: "dashboard", parent: "content", url: "Components/dashboard", },//init: nombreMetodoImportado
    { nombre: "facturas", parent: "content", url: "Components/facturas", },
    { nombre: "reportes", parent: "content", url: "Components/reportes", },
    { nombre: "proveedores", parent: "content", url: "Components/proveedores", },
    { nombre: "usuarios", parent: "content", url: "Components/usuarios", },
    { nombre: "historial", parent: "content", url: "Components/historial", },
    { nombre: "configuracion", parent: "content", url: "Components/configuracion", }
];

const sideMenu = document.getElementById("sidemenu");
const content = document.getElementById("content");
const modulos = document.querySelector(".modulos");

if (sideMenu) {
    sideMenu.addEventListener("click", async (e) => {
        const btn = e.target.closest("button");

        if (!btn || !btn.hasAttribute("contenido")) return;

        const nombre = btn.getAttribute("contenido"); 
        const ruta = rutas.find(r => r.nombre === nombre);

        if (!ruta) return;

        // Marca boton como la pestaña activa y desmarca los demas
        sideMenu.querySelectorAll("button[contenido]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        try {
            await Componentes(ruta);

            if (typeof ruta.init === "function") await ruta.init(); 
            if (typeof ruta.toggle === "function") ruta.toggle(); 

            const modulo = document.querySelector("#h-modulo");
            if (modulo) {
                modulo.textContent = `Módulo de ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`;
            }

        } catch (err) {
            console.error(err);
        }
    });

    // Marca Dashboard como activo al cargar, ya que es la vista que abre por defecto
    const btnInicial = sideMenu.querySelector('button[contenido="dashboard"]');
    if (btnInicial) btnInicial.classList.add("active");
}