1. INICIALIZACIÓN Y VINCULACIÓN
git init                              # Inicia repositorio local
git remote add origin <URL>           # Vincula con repositorio remoto

2. GESTIÓN DE RAMAS
git checkout -b <nombre>              # Crea y cambia a nueva rama
git checkout <nombre>                 # Cambia a rama existente
git branch                            # Lista ramas locales
git branch -r                         # Lista ramas remotas
git branch -a                         # Lista todas las ramas

3. FLUJO DE TRABAJO (COMMIT Y PUSH)
git add .                             # Prepara cambios del directorio
git commit -m "Mensaje"               # Guarda cambios localmente
git push -u origin <nombre>           # Push inicial (vincula upstream)
git push                              # Push para ramas ya vinculadas

4. INTEGRACIÓN (MERGE A MAIN)
git checkout main                     # Cambia a rama principal
git merge <rama_origen>               # Fusiona rama (ej: BackEnd, FrontEnd)
git push origin main                  # Sube la integración al servidor

--

Exportar el zip o clonar el repositorio en htdocs
(deben tener instalado git)

git clone 

Antes de iniciar, se deben de descargar las dependencias de node en la carpeta de Backend
(deben de tener instalado node js)

1-.cd BackEnd
2-.npm install

Para inicializar el host del backend, es necesario utilizar la terminal dentro de la carpeta de backend y ejecutar npm start
1-.cd BackEnd
2-.npm start