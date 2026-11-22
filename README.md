# ZAJA STUDIO · Admin

Aplicación móvil privada para administrar el estudio de manicura. Prototipo inicial con React Native y Expo.

## Incluye

- Acceso visual de demostración.
- Panel diario y solicitudes de cita.
- Aceptar o rechazar solicitudes en estado local.
- Agenda semanal con selección de fecha.
- Catálogo de servicios y precios de muestra.
- Activación de días y horarios de atención.
- Identidad en hueso, ceniza, oliva suave y detalles dorados ornamentales.

Los datos y cambios viven solo en memoria: al cerrar la app se restablecen. No hay autenticación real ni conexión a una base de datos todavía. La app de clientas queda fuera de este primer alcance y se conectará más adelante al mismo backend de reservas.

## Preparar el entorno

Instala Node.js LTS (incluye npm) y crea/ajusta los paquetes compatibles con la versión Expo estable disponible:

```sh
npm install
npx expo install --fix
npx expo start
```

La documentación de Expo recomienda crear proyectos con `create-expo-app`. Esta carpeta ya contiene la estructura inicial; en el entorno donde se preparó el prototipo está disponible Node.js, pero no npm/npx, por lo que todavía no se instalaron dependencias ni se ejecutó la app.

## GitHub

Repositorio público: [Pragmox-89/Zaja-studio](https://github.com/Pragmox-89/Zaja-studio). Se verificó que estaba vacío antes de publicar el primer prototipo. Los cambios locales y remotos todavía no están sincronizados automáticamente.

