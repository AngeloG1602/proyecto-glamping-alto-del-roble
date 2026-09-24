# F1-03 · UI Kit — Glamping Alto del Roble

> Cerrado — 21 sep 2026. Deriva de F1-01 (tokens ya aprobados) y F1-06 (jerarquía).

## Button
| Variante | Fondo | Texto | Estados |
|---|---|---|---|
| Primario | `#A85526` (cobre) | Blanco `#FFFDF9` | hover: 10% más oscuro · disabled: 50% opacidad · loading: spinner, texto oculto |
| Secundario | Transparente, borde `#2F4A3E` | `#2F4A3E` | hover: fondo `#EDE4D3` |

Radio: 8px (F1-01 §7). Nunca usar el cobre fuera de acciones (F1-06 §4).

## Input / Select / Checkbox
Borde `#DCD0BC`, radio 6px. Focus: borde `#2F4A3E` + sombra sutil. Error: borde `#8C3B2A` + mensaje debajo en el mismo color.

## Card (domo)
Radio 12px, sombra sutil (F1-01 §7), fondo `#FAF6EF` o `#EDE4D3` según sección.

## Modal
Usado para: confirmación previa al pago. Fondo overlay `#2B2621` al 60% opacidad. Cierre con click afuera o X.

## Header / Footer
Header: logo + menú (Domos, Experiencias, Cómo llegar, Nosotros) + CTA Reservar en cobre, siempre visible.
Footer: contacto, WhatsApp, RNT, redes, política de privacidad.

## Estados de carga y vacío
Skeleton simple en tarjetas de domo mientras carga. Sin resultados en `/domos`: no aplica (siempre son 6, fijos).
