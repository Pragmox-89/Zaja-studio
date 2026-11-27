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
- Generación de QR de visita (60 s, token) para registrar el sello por visita atendida.
- Diálogo dentro de la app (no Alert) para canjear beneficios.
- Persistencia local de citas, sellos y horarios.
- Restablecer datos de muestra.

## Estado actual

- Los datos y cambios persisten en el dispositivo (AsyncStorage); "Restablecer datos de muestra" para demos limpias.
- Sin autenticación real ni conexión a una base de datos todavía.
- La atención básica de uñas usa como valor de muestra S/ 55 (Manicure clásica); el administrador registra un sello por visita atendida.
- La app de clientas queda fuera de este primer alcance y se conectará más adelante al mismo backend de reservas.

## Preparar el entorno

Requiere Node.js LTS y Expo Go en el teléfono. El proyecto está fijado a Expo SDK 58:

```sh
npm install
npx expo start
```

Mantén el servidor abierto y escanea el QR con Expo Go (Android) o con la cámara (iPhone). El teléfono y la computadora deben estar en la misma red Wi-Fi. Para revisar el proyecto, ejecuta `npx expo-doctor`.

## Generar APK de prueba para Android

Con una cuenta de Expo autorizada, ejecuta `npx eas-cli@latest build --platform android --profile preview`. EAS Build genera un APK de distribución interna y entrega un enlace de descarga.

## GitHub

Repositorio público: [Pragmox-89/Zaja-studio](https://github.com/Pragmox-89/Zaja-studio).
