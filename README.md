# Sistema de Reservas Universitarias

Este proyecto es una aplicación web interactiva que permite gestionar **reservas de espacios universitarios** (aulas, canchas, laboratorios).  
Fue desarrollada como parte del proyecto semanal del curso de IS, aplicando **buenas prácticas de programación, estructura modular y control de versiones con Git.**

---

## Características principales

1. Registro de reservas con nombre, fecha, hora y espacio.  
2. Validación de conflictos (no permite reservas duplicadas ni en fechas pasadas).  
3. Persistencia local mediante **LocalStorage**.  
4. Interfaz dinámica y responsiva con arte visual (imágenes de espacios).  
5. Organización del código por módulos (`services`, `ui`, `styles`).  

---

## Estructura del proyecto

reservas-universitarias/
├── index.html # Página principal
├── package.json # Configuración del proyecto (scripts y dependencias)
├── public/
│ └── assets/ # Imágenes y archivos estáticos
├── src/
│ ├── main.js # Lógica principal de la aplicación
│ ├── services/
│ │ └── storage.js # Gestión de datos y LocalStorage
│ ├── ui/
│ │ └── components.js # Creación dinámica de tarjetas y formularios
│ └── styles/
│ └── main.css # Estilos generales

---

## Instalación y ejecución

### 1️ Clonar el repositorio
git clone [(https://github.com/PaulaOlier/reservas_universitarias.git)
cd reservas-universitarias]

2️ Instalar dependencias
npm install

3️ Iniciar el servidor
npm run dev
(La aplicación se abrirá automáticamente en el navegador en:
http://127.0.0.1:5173)

Tecnologías utilizadas
HTML5 para la estructura del sitio
CSS3 (y buenas prácticas responsivas) para estilos
JavaScript (ES6 modules) para la lógica
Node.js + npm para dependencias
Live Server para el entorno de desarrollo
Git & GitHub para control de versiones

Pruebas
El proyecto incluye un entorno configurado con Vitest para pruebas unitarias.
Ejecuta los tests con:

npm run test


Autora
Paula Olier Alba
Universidad Pontificia Bolivariana