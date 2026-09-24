# F1-01 · Identidad Visual — Glamping Alto del Roble

> ⚠️ **CASO DE SIMULACIÓN.** Cliente ficticio (Caso de práctica 05, Tipo C).
> **Paso 8 · Sprint 0 (Tramo 2).** **Cerrado** — 21 de septiembre de 2026.
> **Quién:** Angelo cierra la capa de criterio directamente — **Daniela no participa en este proyecto** (decisión de Angelo, 21 sep 2026, mismo patrón usado en la simulación de Sonrisa Bogotá).
> **Depende de:** F0-02 (Brief), F0-04 (Análisis de competencia), F1-00 (Investigación de referencias, cerrado 11 sep 2026).
> **Insumo de:** F1-02, F1-05, F1-06, F1-07 (Paso 9) · Demo 1 — 22 de septiembre de 2026.

---

## Cómo leer este documento

| | Qué es | Quién lo cierra |
|---|---|---|
| 🟢 **MEDIBLE** | Contraste, tamaños de toque, jerarquía, legibilidad | Cerrado aquí con verificación calculada (script de contraste WCAG), no estimada |
| 🟡 **CRITERIO** | Qué mundo visual habita la marca | Propuesto por el chat, **cerrado por Angelo** el 21 de septiembre de 2026 |

---

## 1 · Punto de partida

- [x] **No tiene / está desactualizada → se crea desde cero**

No existe identidad de marca. F0-06 §1 ya lo marcó como el ítem crítico #1 del inventario de assets: el logo se genera como parte del proyecto, no se recibe del cliente.

---

## 2 · Mood board — 🟡 CRITERIO, cerrado por Angelo

**Dirección elegida, en una frase:**
> "Naturaleza sin postal genérica: verde bosque profundo y cobre cálido, con el agua de la represa como acento, no como decoración."

**Por qué esta dirección.** F1-00 encontró que en el nicho de glamping el peso visual lo llevan las fotos del lugar, no la producción del sitio, y que ningún competidor local (Guatavita Glamping Club, KingDome) resuelve venta ni prueba social — el terreno se gana por sustancia (vender bien los extras, eliminar la doble reserva), no por una estética disruptiva. Se descarta deliberadamente el cliché "boho romántico" del rubro.

**Referencias seleccionadas** *(salen de F1-00, no se buscan de nuevo)*:

| # | Referencia | Qué tomamos de ahí |
|---|---|---|
| 1 | Guatavita Glamping Club | Punto de partida de dirección (la que más le gustó a Angelo en F1-00) — sin copiarla |
| 2 | AutoCamp | El patrón del panel de reserva modal, aplicado al flujo, no al color |
| 3 | Collective Retreats | Dejar que la fotografía cargue el peso visual; el sitio como marco, no como protagonista |
| 4 | Under Canvas (F0-04) | Extras como línea de negocio propia, con jerarquía visual real, no como anexo |

**Lo que explícitamente NO queremos:**
> - Verde selva saturado ni paletas "boho" con demasiados colores pastel — es lo que hace ver a un glamping genérico de Instagram
> - Azul frío tipo resort de playa — no es el paisaje del lugar (represa de montaña, no mar)
> - Tipografía script/cursiva "romántica" de cliché — la objeción #1 del brief es confianza ("¿cómo sé que es real?"), no fantasía

**Decisión de Angelo (21 sep 2026):** se ratifica la dirección propuesta tal cual, sin cambios.

---

## 3 · Logo

| Campo | Definición |
|---|---|
| ¿Se usa el existente? | No existe — se crea |
| Archivo fuente disponible | No |
| Versión principal | Sobre fondo hueso, en verde bosque |
| Versión sobre fondo oscuro | En cobre o hueso, según legibilidad final |
| Versión reducida / isotipo | Para favicon y sello de confianza junto al RNT en el formulario de reserva |
| Espacio mínimo alrededor | Por definir al producir el archivo |
| Tamaño mínimo de uso | Por definir al producir el archivo |

**Archivos a entregar** → `04-assets/logo/`
- [ ] SVG
- [ ] PNG fondo transparente (varios tamaños)
- [ ] Favicon 512×512

---

## 4 · Paleta de colores — 🟢 MEDIBLE, verificado

| Rol | Nombre | HEX | Uso |
|---|---|---|---|
| Primario | Verde bosque | `#2F4A3E` | Marca, navegación, footer, títulos de sección |
| Primario oscuro | Verde bosque profundo | `#22362C` | Hover/pressed del primario |
| Secundario / acento | Cobre | `#A85526` | **Solo** reservar, pagar, precios, enlaces |
| Fondo claro | Hueso cálido | `#FAF6EF` | Fondo general del sitio |
| Fondo alternativo | Arena | `#EDE4D3` | Secciones alternas, tarjetas |
| Texto principal | Carbón cálido | `#2B2621` | Cuerpo y titulares |
| Texto secundario | Marrón grisáceo | `#6B5F53` | Metadatos, descripciones cortas |
| Borde / divisor | — | `#DCD0BC` | Líneas, separadores, campos |
| Éxito | Verde salvia | `#4C7A55` | Confirmación de reserva y pago |
| Error | Terracota oscuro | `#8C3B2A` | Validaciones fallidas — distinto del acento para no confundirse con "reservar" |

**Verificación de contraste (calculada con script WCAG, sobre las combinaciones reales del sitio):**

| Combinación real | Ratio | Cumple |
|---|---|---|
| Texto principal / fondo claro | 13.90 | AA y AAA |
| Texto principal / fondo alterno | 11.87 | AA y AAA |
| Texto secundario / fondo claro | 5.76 | AA |
| Texto secundario / fondo alterno | 4.91 | AA |
| Texto blanco / botón acento (Reservar) | 5.18 | AA |
| Texto blanco / primario (nav/footer) | 9.53 | AA y AAA |
| Error / fondo claro | 7.03 | AA y AAA |
| Éxito / fondo claro | 4.62 | AA |

Nota de proceso: el primer tono de acento probado (`#B5622E`) daba 4.35 contra blanco — fallaba AA para texto normal en el botón de Reservar, el botón más importante del sitio. Se oscureció a `#A85526` para cumplir con margen. Las 8 combinaciones reales del sitio cumplen AA como mínimo.

- [x] Texto principal sobre fondo claro: ratio ≥ 4.5:1 — verificado (13.90)
- [x] Texto sobre color primario: ratio ≥ 4.5:1 — verificado (9.53)
- [x] Verificado por cálculo de luminancia relativa WCAG (no por herramienta externa)

---

## 5 · Tipografía — 🟡 CRITERIO, cerrado por Angelo

Máximo 2 familias, Google Fonts.

| Uso | Familia | Pesos necesarios | Origen |
|---|---|---|---|
| Títulos | Fraunces | 400, 600 | Google Fonts |
| Cuerpo | Inter | 400, 500, 600 | Google Fonts |

**Por qué:** Fraunces da calidez editorial sin caer en el cliché romántico ("de boda") que el brief no pide. Inter mantiene claridad total en formularios de reserva y pago, donde no hay espacio para personalidad — solo legibilidad.

**Escala tipográfica:**

| Elemento | Tamaño desktop | Tamaño móvil | Peso | Interlineado |
|---|---|---|---|---|
| H1 | 48px | 32px | 600 | 1.15 |
| H2 | 32px | 24px | 600 | 1.2 |
| H3 | 22px | 18px | 600 | 1.25 |
| Cuerpo | 17px | 16px | 400 | 1.5 |
| Cuerpo pequeño | 14px | 13px | 400 | 1.5 |
| Botón | 16px | 15px | 600 | 1 |

**Decisión de Angelo (21 sep 2026):** se ratifica la tipografía propuesta.

---

## 6 · Sistema de espaciado — 🟢 MEDIBLE

**Unidad base:** 8px

| Token | Valor |
|---|---|
| xs | 8px |
| sm | 16px |
| md | 24px |
| lg | 32px |
| xl | 48px |
| 2xl | 64px |

**Ancho máximo del contenido:** 1200px
**Padding lateral en móvil:** 20px

---

## 7 · Estilo de bordes y sombras — 🟡 CRITERIO, cerrado por Angelo

| Elemento | Definición |
|---|---|
| Radio de borde (botones) | 8px |
| Radio de borde (tarjetas) | 12px |
| Radio de borde (inputs) | 6px |
| Sombra sutil | Solo en tarjetas de domo — sensación de "foto flotante" |
| Sombra media | No se usa |
| Sombra elevada (hover) | No se usa — se evita para no competir con la seriedad que pide la objeción de confianza del brief |

**Decisión de Angelo (21 sep 2026):** se ratifica.

---

## 8 · Dirección fotográfica — 🟡 CRITERIO, cerrado por Angelo

| Campo | Definición |
|---|---|
| Estilo | Documental / lifestyle |
| Temperatura | Cálida — luz de atardecer |
| Tratamiento | Sin filtro agresivo |
| Encuadre | Amplio para paisaje/domo, cercano para extras (cena, masaje, decoración) |
| Qué debe transmitir | Escapada de fin de semana, aniversario, calidez — coherente con el avatar (parejas 25–45, Bogotá) |

**¿Requiere sesión fotográfica nueva?** Parcial. El banco de Instagram (~11.000 seguidores) cubre domos y paisaje (F1-00, confirmado suficiente). **Falta lo que F0-06 ya marcó como crítico #5:** fotos de los tres extras (cena romántica, masaje, decoración de aniversario) — hoy no existen y son las que sostienen el problema #1 del negocio ("nadie sabe que existen hasta que llega").

**Si se usan fotos de banco:** no aplica — se usa banco propio del cliente.

**Pregunta abierta de F1-00 sin resolver, trasladada a F1-02:** ¿tiene sentido una galería tipo "comparar domos" dado que son 6 unidades? Propuesta del chat: sí, con un selector tipo tabs en la ficha de cada domo, no una página aparte — pero es decisión de arquitectura (F1-02), no de identidad visual. Queda anotada para ese paso, no resuelta aquí.

**Decisión de Angelo (21 sep 2026):** se ratifica la dirección fotográfica propuesta.

---

## 9 · Iconografía — 🟡 CRITERIO, cerrado por Angelo

| Campo | Definición |
|---|---|
| Librería | Lucide |
| Estilo | Línea |
| Grosor de línea | 1.5px |
| Tamaño estándar | 20px |

---

## 10 · Aprobación

- [x] Daniela completó el documento — **no aplica, no participa en este proyecto**
- [x] Angelo validó viabilidad técnica y cerró la capa de criterio
- [ ] Cliente vio y aprobó la dirección visual — pendiente, Demo 1 del 22 de septiembre de 2026
- **Fecha de aprobación interna:** 21 de septiembre de 2026
- **Aprobado por:** Angelo (rol de Daniela + Angelo, ver preámbulo)

> **Nota de proceso:** el 21 de septiembre de 2026 Angelo cerró la capa de criterio de este documento directamente, sin la participación de Daniela en este proyecto — mismo patrón documentado en la simulación de Sonrisa Bogotá (F1-01 v2, §1). La aprobación del cliente en la Demo 1 sigue siendo la puerta dura real; esta aprobación interna solo habilita avanzar a wireframes y al Paso 9.
