# F2-06 · Plan de Medición — Glamping Alto del Roble

> Cerrado — 21 sep 2026.

## 1 · Definición de éxito
**Lo que dijo el cliente (F0-02 §2):** reservas directas con pago en línea, para reducir la dependencia de Booking/Airbnb (hoy 80% de las reservas, 15–18% de comisión).

| Campo | Valor |
|---|---|
| Métrica principal | Reservas completadas por mes desde el sitio |
| Línea base actual | 0 — hoy toda reserva directa pasa por WhatsApp, sin registro |
| Meta 30 días | Al menos 1 reserva directa medible con pago en línea |
| Meta 90 días | Reducir el % de reservas vía Booking por debajo del 80% actual |

## 2 · Conversión principal
| Campo | Definición |
|---|---|
| Acción que cuenta | Pago confirmado |
| Dónde ocurre | `/confirmacion` |
| Evento | `reserva_completada` |

**Secundarias:** `clic_whatsapp` · `ver_ficha_domo` · `inicio_reserva` (entra a `/reservar`) · `ver_experiencias`.

## 3 · Instrumentación
GA4 en todas las páginas · eventos personalizados de la tabla anterior · Google Search Console · sin píxel de Meta (no hay campañas pagadas en esta versión, F1-07 no aplica).

## 4 · Etiquetado
| Elemento | Identificador | Evento |
|---|---|---|
| CTA hero (Inicio) | `cta-hero` | `inicio_reserva` |
| CTA ficha de domo | `cta-ficha-domo` | `inicio_reserva` |
| Barra fija móvil | `cta-fijo-movil` | `inicio_reserva` |
| Botón de pago | `form-pago` | `reserva_completada` |

## 5 · Origen del tráfico
UTM estándar (`utm_source`, `utm_medium`, `utm_campaign`), aunque hoy no haya pauta pagada — importa saber si Instagram orgánico convierte más que Google.

## 6 · Qué NO se mide como logro
Visitas totales sin contexto, tiempo en página aislado, rebote como métrica única, impresiones.

## 7 · Panel del cliente
Correo mensual con 5 métricas: visitas, reservas iniciadas, reservas completadas, % conversión, canal de origen.

## 8 · Privacidad
- [x] Política de privacidad menciona qué se recolecta
- [x] Analítica sin datos personales innecesarios

## 9 · Verificación antes de lanzar
Pendiente hasta R7 (pago) — se verifica ahí, no antes.
