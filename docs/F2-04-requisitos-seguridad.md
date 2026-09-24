# F2-04 · Requisitos de Seguridad — Glamping Alto del Roble

> Cerrado — 21 sep 2026. Nivel: **Alto** (pagos + panel con contraseña).

## 1 · Clasificación de sensibilidad
| Tipo de dato | ¿Aplica? | Nivel |
|---|---|---|
| Nombre y contacto (huésped) | Sí | Básico |
| Datos financieros/tarjetas | No — delegado a Wompi, nunca se almacenan | — |
| Contraseñas (admin) | Sí | **Alto** |

## 2 · Medidas base
Todas aplican: HTTPS forzado, credenciales solo en variables de entorno, `.env` en `.gitignore`, validación cliente y servidor, límite de envíos en formularios, `npm audit` limpio, mensajes de error sin detalle interno, cabeceras de seguridad.

## 3 · Medidas nivel medio
- [x] Política de privacidad publicada y enlazada en footer
- [x] Casilla de consentimiento en `/reservar` (no premarcada)
- [x] Retención: 2 años para datos de reserva (F2-02 §7)
- [x] Respaldos automáticos (F2-02 §8)
- [x] Acceso a BD restringido

## 4 · Medidas nivel alto
- [x] Contraseña admin con bcrypt
- [x] Sesiones con expiración
- [x] Permisos verificados en servidor (aunque hay un solo rol, la ruta `/panel` se valida server-side, no solo se oculta en la UI)
- [x] Sin almacenamiento de datos de tarjeta — delegado 100% a Wompi
- [ ] Segundo factor — no obligatorio en MVP, recomendado si Wompi lo ofrece sin costo extra

## 5 · Marco legal — Ley 1581 (Habeas Data)
- [x] Aviso de privacidad visible
- [x] Autorización expresa en `/reservar` (casilla no premarcada)
- [x] Finalidad declarada: gestionar la reserva y contactar al huésped
- [x] Canal de contacto del negocio para solicitudes de datos
- [x] **Responsable del tratamiento: el cliente (Alto del Roble)**, no Nova

Sin menores ni datos de salud involucrados.

## 6 · Gestión de credenciales
Todas en el gestor de contraseñas de la agencia. Ninguna en documentos, chats o correos. Cliente recibe sus credenciales (Wompi, dominio) de forma segura al entregar.

## 7 · Antes de salir a producción
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] Ninguna credencial en el historial del repositorio
- [ ] Datos de prueba eliminados de producción
- [ ] Respaldo tomado antes del lanzamiento

## 8 · Validación
- [x] Nivel determinado: Alto
- [x] Medidas correspondientes marcadas
- [x] Requisitos de Ley 1581 cubiertos
