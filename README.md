# Nombre del Proyecto - WodTrack:

## Descripción detallada

Esta aplicación web está diseñada para la gestión integral de un centro de entrenamiento deportivo, combinando funcionalidades para administradores, coaches y usuarios finales con roles y permisos diferenciados.

### Gestión administrativa y de coaches

- **Administrador:** Tiene acceso completo a la plataforma para gestionar usuarios, coaches, tarifas, permisos y entrenamientos. Puede crear, editar y eliminar usuarios y coaches, asignarles roles y controlar su acceso a las diferentes funcionalidades del sistema. Administra la configuración general del centro, las tarifas y las políticas internas.
- **Coach:** Usuarios con rol coach que gestionan directamente los entrenamientos. Pueden crear y modificar sesiones de entrenamiento (workouts), controlar plazas disponibles para cada clase y hacer seguimiento del progreso de los usuarios asignados. Los coaches también gestionan las métricas corporales y las marcas personales de los usuarios, aportando un seguimiento detallado para mejorar el rendimiento.

### Funcionalidades para usuarios

Los usuarios finales tienen acceso a funcionalidades orientadas a su experiencia y progreso personal:

- Consulta y control de las clases reservadas y asistencia.
- Registro y visualización de resultados personales y métricas corporales (peso, porcentaje de grasa, medidas, etc.).
- Seguimiento evolutivo de sus marcas personales y rendimiento en diferentes entrenamientos.
- Visualización de estadísticas y progreso a lo largo del tiempo para facilitar la mejora continua y la motivación.

---

## Tecnologías utilizadas

- **Backend:** Node.js con Express para el desarrollo de la API RESTful.
- **Base de datos:** MongoDB con conexión nativa, sin ODMs para un control directo y eficiente de las consultas y operaciones.
- **Frontend:** HTML, CSS y JavaScript (Vanilla JS) para una interfaz ligera y adaptable.
- **Sesiones:** Gestión de sesión con `sessionStorage` en el navegador para almacenar datos mínimos de autenticación.
- **Comunicación:** Fetch API para realizar peticiones asíncronas y actualizar la interfaz sin recargar la página.
- **Middleware:** Uso de `body-parser` para el procesamiento y validación de datos enviados desde el cliente.

---

## Gestión de datos y seguridad

- La aplicación controla estrictamente los roles y permisos para garantizar que cada usuario accede solo a las funcionalidades autorizadas según su perfil (administrador, coach o usuario).
- Los datos de usuarios, entrenamientos y resultados se almacenan y gestionan en MongoDB, con consultas y modificaciones hechas directamente en el backend para asegurar integridad.
- Se implementan validaciones tanto en frontend como en backend para prevenir errores y garantizar la seguridad.
- El backend protege las rutas mediante validación de sesión y tokenización para evitar accesos no autorizados.
- La gestión de sesiones en frontend usa `sessionStorage` para almacenar información sensible de forma temporal y facilitar una experiencia de usuario fluida.
