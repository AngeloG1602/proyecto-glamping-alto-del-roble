# F2-01 · Especificaciones Técnicas — Glamping Alto del Roble

> Paso 10 · Sprint 0. Cerrado — 21 sep 2026.

## 1 · Identificación
| Campo | Valor |
|---|---|
| Proyecto | Glamping Alto del Roble |
| Tipo (F0-03) | C |
| Repositorio | `nova-alto-del-roble-web` |
| Dominio de producción | `altodelroble.com` (por confirmar disponibilidad) |
| URL de staging | `staging.altodelroble.com` |

## 2 · Stack
| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | Next.js (App Router) | Estándar de la agencia |
| Lenguaje | TypeScript | Menos errores en producción |
| Estilos | Tailwind CSS | Tokens de F1-01 como configuración |
| Base de datos | PostgreSQL (Vercel Postgres) | Reservas, bloqueo de fechas — F0-03 P1/P5/P6 = Sí |
| ORM | Prisma | Estándar, con extensión `btree_gist` (ver F2-02 §6) |
| Autenticación | Auth.js, credenciales, 1 solo rol admin | F0-03: sin roles múltiples |
| Pagos | Wompi | Pasarela colombiana estándar de la agencia |
| Correo | Resend | Gratis hasta 3.000/mes, suficiente |
| Formularios | react-hook-form + Zod | Validación compartida cliente/servidor |
| Mapas | Google Maps embed (iframe) | Gratis — no hace falta geocodificación ni rutas |
| Animaciones | CSS puro | F1-01 ya descartó movimiento salvo elevación de tarjeta |
| Hosting | Vercel | Estándar |

**Librerías adicionales:** `zod` (validación), `date-fns` (fechas en español), `bcrypt` (hash de contraseña admin, F2-04).

## 3 · Rutas y páginas
| Ruta | Página | Render | ¿Protegida? |
|---|---|---|---|
| `/` | Inicio | ISR (revalida 1h) | No |
| `/domos` | Listado con comparador | ISR | No |
| `/domos/[slug]` | Ficha de domo | ISR (revalida 1h) | No |
| `/experiencias` | Los 3 extras | Estático | No |
| `/reservar` | Flujo de reserva | Servidor (calcula precio/disponibilidad en vivo) | No |
| `/confirmacion` | Comprobante | Servidor | No |
| `/como-llegar` | Info | Estático | No |
| `/nosotros` | Historia + RNT | Estático | No |
| `/politica-de-privacidad` | Legal | Estático | No |
| `/panel/*` | Calendario y reservas | Servidor | **Sí** |

**Revalidación bajo demanda:** al confirmarse un pago, se revalida la ficha del domo afectado y `/domos` — la disponibilidad no puede tardar una hora en reflejarse, es el riesgo #1 del negocio.

**Rutas dinámicas:** `/domos/[slug]` — `slug` de la tabla `domos`, 6 registros fijos (seed).

## 4 · Componentes
**Base:** Button, Input/Select/Checkbox, Card, Modal, Header/Footer, CalendarioDisponibilidad (custom).
**De dominio:** DomoCard, TablaIncluidoNoIncluido, ResumenReserva, SelectorExtras, BarraCTAFijaMovil.

## 5 · Reglas de negocio

1. Un domo no puede tener dos reservas confirmadas cuyos rangos de fecha se traslapen — se aplica a nivel de base de datos (restricción de exclusión), no solo en la aplicación.
2. Una reserva **solo bloquea el calendario cuando el pago se confirma exitosamente**. Si el visitante abandona antes de pagar, no queda ninguna reserva ni bloqueo.
3. Las fechas ya reservadas o bloqueadas manualmente por el admin no son seleccionables en el calendario público.
4. El precio por noche depende del tipo de fecha: entre semana $480.000, fin de semana $650.000, festivo $780.000. El sistema determina el tipo automáticamente por la fecha.
5. Los 3 extras (cena $180.000, masaje $150.000, decoración $220.000) son opcionales y se suman al total antes de mostrar el precio final.
6. El formulario de reserva incluye la opción de mascota (sí/no) — el glamping las acepta.
7. Un solo usuario administrador, sin roles diferenciados.
8. La versión en inglés no se construye en el MVP.
9. Los precios no son editables desde el panel en el MVP — cambiar precios requiere a Nova (Fase 2).
10. Si el pago falla, no queda ninguna reserva registrada. No hay reintento automático en el MVP (Fase 2).
11. Las reseñas de Booking/Airbnb no se copian ni se citan textualmente en el sitio.

## 6 · Formularios
| Formulario | Campos | Validaciones | Destino |
|---|---|---|---|
| Reserva | Nombre, contacto, # huéspedes, mascota sí/no, notas | Requeridos excepto notas; fechas no en el pasado | BD + correo (Resend) |

**Protección contra spam:** honeypot + límite de 5 envíos/hora por IP.

## 7 · Contenido: dónde vive
| Contenido | Fuente | ¿Cliente lo edita? |
|---|---|---|
| Textos institucionales | Código (F1-05) | No, vía Nova |
| Domos y extras | Base de datos (seed inicial) | No en el MVP |
| Imágenes | Banco de Instagram, subidas al proyecto | No en el MVP |

## 8 · SEO
- [x] Título y descripción únicos por página
- [x] Open Graph
- [x] Sitemap.xml / Robots.txt
- [x] Schema.org tipo `LodgingBusiness`
- [x] Alt text en todas las imágenes

**Palabras clave objetivo:** "glamping Guatavita", "glamping cerca de Bogotá", "domos con vista a represa".

## 9 · Rendimiento
Estándar de la agencia: Lighthouse ≥ 90, LCP < 2.5s, CLS < 0.1, home < 1.5MB. Imágenes en formato moderno (WebP/AVIF), carga diferida bajo el fold.

## 10 · Variables de entorno
`DATABASE_URL` · `WOMPI_PUBLIC_KEY` / `WOMPI_PRIVATE_KEY` · `RESEND_API_KEY` · `AUTH_SECRET` · `ADMIN_PASSWORD_HASH`

## 11 · Entornos
| Entorno | Rama | Base de datos |
|---|---|---|
| Local | `dev` | Local/prueba |
| Staging | `staging` | Prueba |
| Producción | `main` | Producción |

## 12 · Validación
- [x] Stack definido y justificado
- [x] 11 reglas de negocio sin ambigüedad
- [x] Rutas y componentes listados
- [x] Variables de entorno identificadas
