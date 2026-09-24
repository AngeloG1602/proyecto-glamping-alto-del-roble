# Backlog y Rebanadas — Glamping Alto del Roble

> Paso 11 · Sprint 0. Cerrado — 21 sep 2026. Depende de F1-02, F1-05, F1-06.

## Flujos (de F1-06)
1. Visitante reserva un domo (camino feliz)
2. Visitante compara los 6 domos antes de decidir
3. Admin gestiona calendario y reservas

## Backlog — 15 rebanadas, 30.5 días

| # | Rebanada | Talla | Días | Depende de |
|---|---|---|---|---|
| R0 | Cimientos: repo, despliegue, BD, Wompi sandbox, dominio, medición | M | 1.5 | — |
| R1 | Esqueleto caminante — layout, nav, sistema visual F1-01 en código | M | 1.5 | R0 |
| R2 | Ficha de domo completa (galería, precio, incluido/no incluido) | L | 3.5 | R1 |
| R5 | Disponibilidad real — calendario conectado a BD, fechas ocupadas no seleccionables | L | 3.5 | R2 |
| R6 | Flujo de reserva — fechas+extras+datos, sin pago | L | 3.5 | R5 |
| R7 | Pago + bloqueo atómico de fecha (resuelve el riesgo #1 — doble reserva, F0-02 §8) | L | 3.5 | R6 |
| R8 | Confirmación + correo automático | M | 1.5 | R7 |
| R3 | Listado de 6 domos con comparador | M | 1.5 | R2 |
| R4 | Inicio completo (5 secciones) | L | 3.5 | R1 |
| R9 | Experiencias (3 extras) | S | 0.5 | R1 |
| R10 | Cómo llegar + Nosotros | M | 1.5 | R1 |
| R11 | Legal + 404 | S | 0.5 | R1 |
| R12 | Panel — login (1 rol) | M | 1.5 | R0 |
| R13 | Panel — calendario maestro | M | 1.5 | R12, R5 |
| R14 | Panel — gestión de reservas | M | 1.5 | R12, R7 |

**Orden por riesgo:** R0→R1→R2→R5→R6→R7 primero — es donde vive el incidente real de doble reserva. El resto después.

**Nota de resecuenciación (24 sep 2026):** para la primera versión local (sin BD ni despliegue), el orden real de construcción es R0→R1→R2→R3→R4→R9→R10→R11 (contenido/UI, con datos hardcodeados) y luego R5→R6→R7→R8→R12→R13→R14 (cuando se conecte base de datos real).

## Paso 7 — Contraste con el plazo (⚠️ advertencia registrada, no aplicada como bloqueo)

| | |
|---|---|
| Capacidad declarada | Angelo 5h/semana + Nicoll 5h/semana = 10h/semana |
| Capacidad efectiva (−25% reserva) | 7.5h/semana |
| Semanas hasta diciembre 2026 | ~10 |
| Capacidad total | **75 horas** |
| Backlog (30.5 días × 6h) | **~183 horas** |
| **Déficit bajo el modelo estándar** | **~108 horas** |

**⚠️ Nota registrada por Angelo (21 sep 2026):** este cálculo asume desarrollo manual persona-hora. En este proyecto el desarrollo se hace con Claude Code, no con horas de código escritas a mano — el modelo de capacidad del sistema no refleja ese ritmo. Se documenta el déficit tal como exige el procedimiento (para que, con un cliente real y desarrollo humano, el cálculo sea correcto desde el inicio), pero **no se recorta el MVP** y se avanza a Sprint 1 confiando en el ritmo real con IA.

## Estado
- [x] Backlog derivado de F1-02 + F1-05 + F1-06
- [x] Orden por riesgo aplicado
- [x] Contraste con plazo calculado y advertencia documentada
- [ ] MVP recortado — **decisión: no se recorta**, se avanza con Claude Code
