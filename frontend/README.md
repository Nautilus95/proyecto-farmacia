Sistema de Gestión de Farmacia (Frontend & Backend)

Sistema web profesional desarrollado para la administración integral de una farmacia, enfocado en el control de inventario, categorización de productos y gestión de personal.

🚀 Características Principales

Dashboard General: Resumen en tiempo real con métricas clave (total de medicamentos, categorías y empleados) con tarjetas visuales interactivas y diseño corporativo.

Gestión de Medicamentos: Control CRUD completo (Crear, Leer, Actualizar, Eliminar) con validación estricta de campos, precios, stock y vinculación por categorías.

Gestión de Categorías: Clasificación ordenada de productos con interfaz optimizada.

Gestión de Empleados: Administración del personal de la farmacia (DNI, email, cargos como Farmacéutico, Vendedor, etc.) con validaciones de formato.

Diseño UI/UX Profesional (Rama feature/diseno-visual):

Paleta de colores institucional (Azul médico oscuro y acentos cian/verde).

Menú lateral permanente estructurado.

Tablas con efecto hover y botones de acción unificados.

🛠️ Stack Tecnológico

Frontend:

React (con Vite)

Material UI (MUI v6)

React Router DOM

Backend:

Python / Flask

Flask-SQLAlchemy (ORM)

Base de Datos:

MySQL

⚙️ Configuración y Ejecución Local

1. Backend (Flask)

Asegúrate de tener Python instalado y los paquetes del servidor configurados.

# Activar entorno virtual (si aplica) y correr el servidor Flask
python app.py


(El servidor backend corre por defecto en http://127.0.0.1:5000)

2. Frontend (React)

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con Vite
npm run dev


(El frontend se abrirá habitualmente en http://localhost:5173)

📂 Estructura del Proyecto (Frontend)

src/
│
├── components/
│   └── Layout.jsx       # Menú lateral oscuro fijo y estructura general
├── pages/
│   ├── Dashboard.jsx    # Tarjetas métricas y resumen general
│   ├── Medicamentos.jsx # CRUD de medicamentos y validaciones
│   ├── Categorias.jsx   # CRUD de categorías
│   └── Empleados.jsx    # CRUD de empleados y validaciones
│
├── App.jsx              # Configuración de rutas principales
├── main.jsx             # Proveedor de temas (ThemeProvider) de MUI y estilos base
└── index.css            # Estilos globales


💡 Mejoras Visuales Recientes (feature/diseno-visual)

Unificación de la paleta de colores corporativa a través de createTheme en Material UI.

Estandarización de tablas con filas interactivas (hover) y botones compactos alineados mediante <Stack>.

Preservación del 100% de la lógica de negocio, endpoints REST del backend, estados y validaciones de formularios existentes.