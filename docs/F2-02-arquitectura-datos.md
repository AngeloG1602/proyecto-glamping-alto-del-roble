# F2-02 · Arquitectura de Datos — Glamping Alto del Roble

> Cerrado — 21 sep 2026. Activado por F0-03 (P1/P5/P6 = Sí).

## 1 · Motor
PostgreSQL en Vercel Postgres, con extensión `btree_gist` habilitada (necesaria para la regla #1 de F2-01).

## 2 · Modelos

### Domo
Para qué existe: cada uno de los 6 domos publicables.
| Campo | Tipo | Obligatorio | Único | Notas |
|---|---|---|---|---|
| id | uuid | sí | sí | |
| slug | string | sí | sí | URL |
| nombre | string | sí | no | |
| descripcionCorta | string | sí | no | |
| descripcionLarga | text | sí | no | |
| capacidad | int | sí | no | huéspedes máx. |
| fotos | json | sí | no | array de URLs |

### Extra
3 registros fijos (seed): cena romántica $180.000, masaje $150.000, decoración de aniversario $220.000.
| Campo | Tipo | Notas |
|---|---|---|
| id, nombre, precio, descripcion | — | — |

### Reserva
| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| id | uuid | sí | |
| domoId | uuid (FK) | sí | → Domo |
| fechaInicio, fechaFin | date | sí | rango |
| nombreHuesped, contacto | string | sí | |
| numHuespedes | int | sí | |
| mascota | boolean | sí | |
| notas | text | no | |
| precioTotal | int | sí | calculado al confirmar |
| estadoPago | enum | sí | pendiente / confirmada / fallida |
| wompiTransactionId | string | no | |

### BloqueoManual
Fechas que el admin bloquea (mantenimiento) sin que exista una reserva. `domoId`, `fechaInicio`, `fechaFin`, `motivo`.

### Usuario
Un solo registro admin: `email`, `passwordHash` (bcrypt).

## 3 · Relaciones
| A | Relación | B | Al borrar A |
|---|---|---|---|
| Domo | 1 a muchos | Reserva | **Restringir** — nunca se borra un domo con historial |
| Domo | 1 a muchos | BloqueoManual | Cascada |
| Reserva | muchos a muchos (tabla `ReservaExtra`) | Extra | Cascada |

## 4 · Índices
| Tabla | Campo(s) | Por qué |
|---|---|---|
| Reserva | `(domoId, fechaInicio, fechaFin)` | Chequeo de traslape — la consulta más crítica del sistema |

## 5 · Datos iniciales (seed)
6 domos (nombre y fotos genéricas, editables después) · 3 extras con precio de F0-02 §1.

## 6 · Consulta crítica — el corazón técnico del proyecto

**Verificar disponibilidad y confirmar reserva sin condición de carrera.** Dos personas pueden intentar pagar el mismo domo en la misma fecha al mismo tiempo — es literalmente el incidente real que ya le costó reseñas al cliente (F0-02 §8).

**Solución:** restricción de exclusión (`EXCLUDE USING gist`) en la tabla `Reserva`, sobre `domoId` + rango de fechas, condicionada a `estadoPago = 'confirmada'`. La base de datos rechaza el segundo `INSERT` traslapado aunque las dos peticiones lleguen en el mismo milisegundo — no se depende de que la aplicación revise "a tiempo".

## 7 · Datos personales
| Campo | ¿Personal? | ¿Sensible? | Retención |
|---|---|---|---|
| nombreHuesped, contacto | Sí | No | 2 años (efectos contables) |
| passwordHash | — | Alto (credencial) | Mientras exista la cuenta |

Sin datos de salud ni de menores. Ver F2-04 para el resto.

## 8 · Respaldos
Automáticos, diarios, retención 30 días (plan estándar de Vercel Postgres).

## 9 · Migraciones
- [x] Migraciones versionadas de Prisma
- [x] Nunca se modifica el esquema directamente en producción
- [x] Toda migración se prueba primero en staging
