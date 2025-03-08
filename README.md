# Gapsi e-Commerce: Frontend en React & Backend en Node.js

Este proyecto está compuesto por un **frontend en React** y un **backend en Node.js**. A continuación, encontrarás instrucciones detalladas para configurar y ejecutar ambas partes del proyecto.

## Requisitos

- **Node.js** (preferentemente la versión LTS)
- **npm** (gestor de paquetes de Node.js)

## Instalación

### 1. Instalar las dependencias

#### Para el frontend (React):

Desde la raíz del proyecto, navega a la carpeta del frontend:

```bash
cd frontend
```

Luego, instala las dependencias utilizando `npm`:

```bash
npm install
```

#### Para el backend (Node.js):

Desde la raíz del proyecto, navega a la carpeta del backend:

```bash
cd backend
```

Luego, instala las dependencias utilizando `npm`:

```bash
npm install
```

### 2. Configuración de variables de entorno

Ambos proyectos requieren archivos `.env` para configuraciones específicas. Asegúrate de tener ambos archivos `.env` correctamente configurados:

#### Frontend (.env en la carpeta `frontend`):

```plaintext
PORT=5001
REACT_APP_NODE_ENV="production/development (segun sea el caso)"
REACT_APP_API_ROUTE="ruta_al_back"
REACT_APP_PUBLIC_ROUTE="ruta_al_front"
```

#### Backend (.env en la carpeta `backend`):

```plaintext
PORT=5000
ENVIRONMENT='Beta/Productivo (según sea el caso) '
TOKEN_SECRET='tu_token_secreto_de_64_caracteres'
API_PUBLIC_ROUTE='ruta_al_back'
```

### 3. Creación de base de datos

#### Para un correcto funcionamiento:

Deberás crear un archivo llamado `db.json` en la carpeta `backend/config`, de lo contrario no será posible el funcionamiento de la App.

### 4. Ejecutar el proyecto

#### Para ejecutar el frontend:

Para ejecutar el frontend en React, usa el siguiente comando desde la carpeta `frontend`:

```bash
npm start
```

Esto iniciará el servidor en el puerto especificado en el archivo `.env` (`PORT=5001`), y podrás acceder al frontend en [http://localhost:5001](http://localhost:5001).

#### Para ejecutar el backend:

Para ejecutar el backend en Node.js, usa el siguiente comando desde la carpeta `backend`:

```bash
node config/server.js
```

Esto iniciará el servidor en el puerto especificado en el archivo `.env` para el backend (`PORT=5000`), y podrás acceder al backend en [http://localhost:5000](http://localhost:5000).

## Estructura del proyecto

El proyecto está organizado en dos carpetas principales:

- **frontend**: Contiene la aplicación React, que se ejecuta en el lado del cliente.
- **backend**: Contiene el servidor Node.js, que maneja la lógica del servidor y la interacción con la base de datos JSON y almacenamiento de archivos.

## Notas adicionales

- Asegúrate de que tanto el **frontend** como el **backend** estén ejecutándose simultáneamente para que la comunicación entre ambos funcione correctamente.
- En el archivo `.env` del frontend, `REACT_APP_API_ROUTE` debe apuntar a la URL del backend.
- En caso de que requieras la documentación del API la podrás encontrar en https://documenter.getpostman.com/view/9457476/2sAYdoFSyq.

---

¡Con estas instrucciones, deberías poder iniciar tanto el frontend como el backend sin problemas! Si tienes algún inconveniente o necesitas más detalles, no dudes en consultar la documentación o crear un issue en el repositorio.