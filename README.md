TP3 FINAL - JUMP
Grupo 06
Ana Santos

Andrea Ayelén Diaz

Daniela Soto

Magalí Giles

La temática elegida para la base de datos es una indice de trailers de peliculas

Requisitos
Antes de comenzar, asegúrarse de tener instalado lo siguiente en tu entorno de desarrollo:

Node.js
npm (Node Package Manager)
Instalación
Instala las dependencias Abre la terminal  Ctrl + ñ en Visual Studio Code

npm install

Dependencias en este proyecto :

body-parser: Middleware para parsear cuerpos de solicitudes HTTP en Express.js.

dotenv: Carga variables de entorno desde un archivo .env a process.env.

express: Framework web rápido, minimalista y flexible para Node.js.

Sequelize: Driver oficial de Sequelize

nodemon: Utilidad que monitorea cambios en los archivos y automáticamente reinicia la aplicación.

# Proyecto de API con Express y Sequelize 

Este proyecto es una API basada en Express y Sequelize que se conecta a una base de datos MySQL. Proporciona endpoints para gestionar géneros, etiquetas, contenidos, categorías y relaciones entre ellos.

Estructura del Proyecto
config/config.js: Archivo de configuración que incluye la configuración del puerto.
database/connect_mysql.js: Archivo para establecer la conexión con la base de datos MySQL.
controllers/: Carpeta que contiene los controladores para diferentes recursos (géneros, etiquetas, contenidos, categorías, etc.).
database/models/: Carpeta que contiene los modelos Sequelize para las tablas de la base de datos.
server.js: Archivo principal que configura y ejecuta el servidor Express.
Instalación
Clona el repositorio:

git clone https://github.com/tu-usuario/tu-repositorio.git`` 
Navega al directorio del proyecto:

bash

Copiar código

cd tu-repositorio

Instala las dependencias:

bash

Copiar código

npm install

Configura la base de datos: Asegúrate de que tu archivo de configuración config/config.js esté correctamente configurado para tu entorno. Define el puerto y los detalles de la conexión a la base de datos.

Uso
Inicia el servidor:

npm start

El servidor se ejecutará en el puerto especificado en config/config.js.

Accede a los endpoints:

La API proporciona los siguientes endpoints principales bajo el prefijo /api:

Géneros:

GET /api/generos: Obtener todos los géneros.
GET /api/generos/:id: Obtener un género específico por ID.
POST /api/generos: Crear un nuevo género.
PUT /api/generos/:id: Actualizar un género existente por ID.
DELETE /api/generos/:id: Eliminar un género por ID.
Etiquetas:

GET /api/tags: Obtener todas las etiquetas.
GET /api/tags/:id: Obtener una etiqueta específica por ID.
POST /api/tags: Crear una nueva etiqueta.
PUT /api/tags/:id: Actualizar una etiqueta existente por ID.
DELETE /api/tags/:id: Eliminar una etiqueta por ID.
Contenidos:

GET /api/contenidos: Obtener todos los contenidos.
GET /api/contenidos/:id: Obtener un contenido específico por ID.
POST /api/contenidos: Crear un nuevo contenido.
PUT /api/contenidos/:id: Actualizar un contenido existente por ID.
DELETE /api/contenidos/:id: Eliminar un contenido por ID.
Categorías:

GET /api/categorias: Obtener todas las categorías.
GET /api/categorias/:id: Obtener una categoría específica por ID.
POST /api/categorias: Crear una nueva categoría.
PUT /api/categorias/:id: Actualizar una categoría existente por ID.
DELETE /api/categorias/:id: Eliminar una categoría por ID.
TagsDeContenido:

GET /api/tagsDeContenido: Obtener todas las asociaciones entre tags y contenidos.
GET /api/tagsDeContenido/:tagId/:contenidoId: Obtener una asociación específica por tagId y contenidoId.
POST /api/tagsDeContenido: Crear una nueva asociación entre tag y contenido.
PUT /api/tagsDeContenido/:tagId/:contenidoId: Actualizar una asociación existente por tagId y contenidoId.
DELETE /api/tagsDeContenido/:tagId/:contenidoId: Eliminar una asociación específica por tagId y contenidoId.
Conexión a la Base de Datos
La conexión a la base de datos se realiza a través de Sequelize. Asegúrate de tener MySQL en funcionamiento y que los detalles de conexión estén correctos en config/config.js.

Cierre de la Conexión
El servidor cierra la conexión a la base de datos al finalizar. Si deseas cerrar la conexión manualmente, puedes hacerlo con la función closeConnection() que está disponible en server.js.

Uso
Herramienta utilizada para probar APIs :  Thunder Client y  Postman

Contribución del grupo mediante git
Se realiza un fork del proyecto.
Reliza actualización de repositorio remoto en tu repositorio local (git pull)
Realiza tus cambios y haz commit ( git add . - git commit -am 'Agrega nueva característica').
Sube tus cambios a la rama (git push)
Glosario de Errores
Código	Descripción
200	OK - Respuesta estándar para solicitudes correctas.
201	Created - La solicitud ha tenido éxito y se ha creado o actualizado un recurso.
400	Bad Request - La solicitud contiene una sintaxis incorrecta o no puede procesarse.
404	Not Found - El servidor no pudo encontrar el contenido solicitado.
500	Internal Server Error - Indica un error interno del servidor.
501	Not Implemented - La solicitud no se ha implementado.
503	Service Unavailable - El servidor no está disponible.
