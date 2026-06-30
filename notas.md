Antes de empezar, asegúrate de tener instalado:

Git
Docker Desktop
Python 3.x con pip
XAMPP (para servir el FrontEnd)

1. Obtener el proyecto
Clona el repositorio dentro de la carpeta htdocs de XAMPP: git clone https://github.com/BrandonGlz/Invoxa.git


2. Levantar la base de datos con Docker Desde la raíz del proyecto, levanta el contenedor de PostgreSQL: docker-compose up -d

Verifica que el contenedor esté corriendo: docker ps

Deberían ver invoxa_postgres en la lista con estado Up.

Crear las tablas
Django se encarga de crear las tablas a partir de los modelos. Primero activa el entorno virtual  y luego ejecuta: python manage.py migrate

Cargar datos de prueba: docker exec -i invoxa_postgres psql -U invoxa_admin -d invoxa_db < database\insert.sql

Esto inserta el catálogo base de datos: estados, roles, usuarios, proveedores y facturas de prueba.

Crear las vistas: docker exec -i invoxa_postgres psql -U invoxa_admin -d invoxa_db < database\views.sql

Las vistas son las consultas que alimentan el dashboard (KPIs y gráficas).

Acceder a la base de datos directamente: docker exec -it invoxa_postgres psql -U invoxa_admin -d invoxa_db

Comandos útiles dentro de la consola de PostgreSQL:

sql\dt          -- lista las tablas
\dv          -- lista las vistas
\q           -- salir


3. Configurar y levantar el BackEnd, activar el entorno virtual: venv_invoxa\Scripts\activate

3.1 Sabrás que está activo porque el prompt muestra (venv_invoxa) al inicio.

3.2 Instalar dependencias (solo la primera vez): pip install -r requirements.txt

3.3 Levantar el servidor de Django: python manage.py runserver

El servidor queda disponible en http://localhost:8000.

4. Estructura del BackEnd (core/)
core es la aplicación principal que maneja toda la lógica del backend y la conexión con la base de datos.

models.py       Define la estructura de todas las tablas de la BD
serializers.py  Controla qué campos de cada tabla se exponen en la API
services/       Contiene las consultas SQL hacia la BD (equivalente a los repositorios)
views/          Equivalente a los controladores: define el método HTTP de cada endpoint.
urls.py         Registra las rutas de cada endpoint para que el FrontEnd pueda consumirlas
utils/          Utilidades compartidas: envío de correos, almacenamiento temporal de códigos, etc.

 
5. Comandos Git
Inicialización y vinculación

git init                          # Inicia repositorio local
git remote add origin <URL>       # Vincula con repositorio remoto

Gestión de ramas

git checkout -b <nombre>          # Crea y cambia a nueva rama
git checkout <nombre>             # Cambia a rama existente
git branch                        # Lista ramas locales
git branch -r                     # Lista ramas remotas
git branch -a                     # Lista todas las ramas
git branch -d <nombre>            # Elimina rama local

Flujo de trabajo diario

git status                        # Ver estado actual de los archivos
git add .                         # Prepara todos los cambios
git add <archivo>                 # Prepara un archivo específico
git commit -m "Mensaje"           # Guarda cambios localmente
git push -u origin <nombre>       # Push inicial (vincula upstream)
git push                          # Push para ramas ya vinculadas
git pull                          # Trae los últimos cambios del remoto

Integración a main

git checkout main                 # Cambia a rama principal
git pull origin main              # Asegúrate de tener main actualizado
git merge <rama_origen>           # Fusiona rama (ej: BackEnd, FrontEnd)
git push origin main              # Sube la integración al servidor

Revisión de historial

git log --oneline                 # Ver historial resumido
git diff                          # Ver cambios sin preparar
