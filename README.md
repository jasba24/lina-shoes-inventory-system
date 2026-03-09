# 👠 Lina Shoes - Sistema de Gestión de Inventarios

Solución tecnológica Full-Stack diseñada para optimizar el control de stock y ventas de una tienda minorista de calzado. Este proyecto nació de la necesidad de digitalizar procesos manuales para reducir errores operativos.

## 🚀 Características Principales

- **Gestión de Inventario:** Control en tiempo real de entradas y salidas de productos.
- **Catálogo Digital:** Interfaz amigable para la visualización de existencias.
- **Arquitectura Escalable:** Separación clara entre Frontend y Backend.

## 🏗️ Arquitectura y Buenas Prácticas

El proyecto está construido bajo una estructura de **Monorepo**, priorizando la separación de responsabilidades y la escalabilidad del sistema.

### 🧩 Modularidad y Organización

La interfaz se diseñó de manera modular para facilitar el mantenimiento y la reutilización de componentes:

- **Componentes por Dominio:** Carpetas organizadas funcionalmente (`catalog`, `forms`, `layout`, `gallery`).
- **CSS Nativo:** Estilos desarrollados 100% con CSS puro, optimizando el rendimiento y evitando la sobrecarga de dependencias externas.
- **Gestión de Estado:** Uso de **Context API** y **Custom Hooks** para un flujo de datos limpio y centralizado en el Frontend.

### ⚙️ Backend (API) y Lógica de Negocio

Se implementó una arquitectura robusta en Node.js siguiendo el patrón **MVC (Modelo-Vista-Controlador)**:

- **Middleware Pipeline:** Flujo de peticiones optimizado mediante funciones intermedias:
  - **User Extraction:** Middleware personalizado para la extracción y validación de identidad vía JWT.
  - **Global Error Handler:** Gestor centralizado que traduce excepciones técnicas a respuestas HTTP precisas (400, 401, 404, 500).
  - **Not Found Handler:** Control de rutas no definidas para mejorar la robustez del servidor.
- **Seguridad:** Implementación de autenticación basada en **JWT (JSON Web Tokens)** y protección de rutas críticas.
- **Clean Code:** Código estructurado bajo principios SOLID, facilitando la legibilidad y la futura implementación de pruebas unitarias con **Vitest**.

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, Vite, React Router 7.
- **Backend:** Node.js, Express.
- **Base de Datos:** MongoDB (NoSQL) para un esquema de datos flexible.
- **Testing & Tooling:** Vitest, ESLint, Postman.
