# F2-03 · Integraciones — Glamping Alto del Roble

> Cerrado — 21 sep 2026.

## 1 · Inventario
| # | Servicio | Para qué | Costo mensual | Estado |
|---|---|---|---|---|
| 1 | Wompi | Pagos en línea | % por transacción, sin fijo | Pendiente |
| 2 | Resend | Correo transaccional | Gratis (< 3.000/mes) | Pendiente |
| 3 | Vercel Postgres | Base de datos | ~USD 0–10 | Pendiente |
| 4 | Google Maps embed | Mapa en /como-llegar | Gratis (iframe simple) | Pendiente |
| 5 | Google Analytics 4 | Medición (ver F2-06) | Gratis | Pendiente |
| 6 | WhatsApp `wa.me` | Canal secundario | Gratis | Pendiente |

**Costo recurrente total estimado: bajo USD 25/mes** — no requiere aprobación explícita adicional del cliente (F2-03 §1, umbral del sistema).

## 2 · Detalle

### I-01 · Wompi
| Campo | Valor |
|---|---|
| Para qué | Cobrar la reserva completa al confirmar |
| Autenticación | API key pública + privada |
| Variables de entorno | `WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY` |
| Plan B si falla | El visitante ve error y puede reintentar manualmente — sin reintento automático (F0-03, Fase 2) |
| Dueño de la cuenta | **Cliente** — el dinero entra a su cuenta |

Flujo: `/reservar` envía datos → Wompi procesa → webhook confirma → se inserta la Reserva con `estadoPago = confirmada` (dispara la restricción de exclusión de F2-02 §6).

### I-02 · Resend
Correo de confirmación al huésped + aviso interno a Andrés/Mariana por cada reserva pagada. Dueño: Nova Network (año 1).

### I-03 · Google Maps embed
Solo iframe público con la ubicación real (a diferencia de un intermediario tipo inmobiliaria, aquí SÍ conviene mostrar la ubicación exacta — es el destino, no un dato a proteger).

## 3 · Integraciones con sistemas del cliente
Ninguna — no hay CRM ni sistema previo del cliente que integrar (caso ficticio, sin antecedente declarado).

## 4 · Propiedad de las cuentas
| Servicio | Cuenta a nombre de |
|---|---|
| Dominio | Cliente |
| Wompi | **Cliente** |
| Hosting / BD | Nova Network (año 1) |
| Analítica | Cliente, con acceso de Nova |

## 5 · Validación
- [x] Integraciones inventariadas con costo
- [x] Wompi confirmado como pasarela estándar de la agencia (no asumido sin verificar)
- [x] Plan B definido para Wompi (la única crítica)
- [x] Propiedad de cuentas clara
