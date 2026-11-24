# ZAJA STUDIO · Admin

Aplicación móvil privada para administrar el estudio de manicura. Prototipo inicial con React Native y Expo.

## Incluye

- Acceso visual de demostración.
- Panel diario y solicitudes de cita.
- Aceptar o rechazar solicitudes en estado local.
- Agenda semanal con selección de fecha.
- Catálogo de servicios y precios de muestra.
- Activación de días y horarios de atención.
- Tarjetas de clientes frecuentes con seis sellos y cálculo de diferencia para canjear otra atención.
- Identidad en hueso, ceniza, oliva suave y detalles dorados ornamentales.

Los datos y cambios viven solo en memoria: al cerrar la app se restablecen. No hay autenticación real ni conexión a una base de datos todavía. La atención básica de uñas usa como valor de muestra S/ 55 (Manicure clásica); el administrador registra un sello por visita atendida. La app de clientas queda fuera de este primer alcance y se conectará más adelante al mismo backend de reservas.

## Preparar el entorno

Requiere Node.js LTS y Expo Go en el teléfono. El proyecto está fijado a Expo SDK 58:

```sh
npm install
npx expo start
```

Mantén el servidor abierto y escanea el QR con Expo Go (Android) o con la cámara (iPhone). El teléfono y la computadora deben estar en la misma red Wi-Fi. Para revisar el proyecto, ejecuta `npx expo-doctor`.

## GitHub

Repositorio público: [Pragmox-89/Zaja-studio](https://github.com/Pragmox-89/Zaja-studio).

