# F1-06 · Diseño de Conversión — Glamping Alto del Roble

> Paso 9 · Sprint 0. Cerrado — 21 sep 2026. Depende de F1-02, F1-05.

## 1 · Acción única por página

| Página | Acción principal | Secundaria permitida |
|---|---|---|
| Inicio | Ver los domos | Ver experiencias |
| /domos | Entrar a una ficha | — |
| **Ficha de domo** | **Reservar** | WhatsApp |
| /experiencias | Ver un domo disponible | WhatsApp |
| /reservar | Confirmar y pagar | — |
| /como-llegar, /nosotros | *(sin acción propia)* → Ver domos | WhatsApp |

## 2 · Recorrido visual

**Ficha de domo** (columna central, una sola tarea):
```
1. Galería → 2. Precio + disponibilidad en vivo → 3. Incluido/no incluido → 4. CTA Reservar → 5. Extras sugeridos
```
El ojo llega al precio por contraste tipográfico; al botón por ser el único elemento en cobre sólido de la pantalla.

**Inicio** (Z en el hero, F hacia abajo):
```
1. Hero (promesa) → 2. Los 6 domos → 3. Extras destacados → 4. Confianza/mecanismo → 5. CTA final
```

**Reservar** (columna central, sin menú que distraiga):
```
1. Fechas+precio → 2. Extras → 3. Datos → 4. Política de cancelación → 5. Pago
```

## 3 · Above the fold — Ficha de domo, móvil (640px)

| Elemento | ¿Está? | Justificación |
|---|---|---|
| Qué es el negocio | ✅ | Foto + nombre + precio |
| Para quién | ✅ | Vista a la represa, implícito en foto/título |
| Promesa central | ✅ | Titular de F1-05 |
| Acción principal visible | ✅ | Botón Reservar sin scroll |
| Señal de confianza | ✅ | Sello RNT en miniatura |

Ajuste móvil: foto a 220px de alto, precio y botón en franja inferior fija.

## 4 · Herramientas de peso visual

| Herramienta | Uso |
|---|---|
| Tamaño | Foto y precio dominan la ficha |
| Contraste | Cobre sobre hueso — máximo contraste de la pantalla |
| Espacio en blanco | Alrededor del botón Reservar |
| Posición | CTA después del precio y del incluido/no incluido, nunca antes |
| Movimiento | Ninguno (F1-01 ya descartó sombra elevada) |

**Color reservado para CTA:** `#A85526` (cobre). No aparece en headers, iconos ni fondos de sección — solo en botones de acción.

## 5 · Estrategia de CTA

| Parámetro | Definición |
|---|---|
| CTA por página | Máx. 2 repeticiones de la misma acción en la ficha |
| CTA fijo en móvil | Sí — barra inferior en la ficha de domo, con precio |
| CTA en el menú | Sí — "Reservar" siempre visible |
| Principal vs. secundario | Principal: relleno cobre, texto blanco. Secundario: contorno verde bosque |

**Ubicación en Inicio:** 1) tras el hero (secundario, para el ya decidido) · 2) tras confianza/mecanismo (principal — objeción resuelta primero)
**Ubicación en Ficha de domo:** 1) tras precio (secundario) · 2) tras incluido/no incluido (principal — objeción #3 resuelta)

## 6 · Puntos de fricción

| Fricción | Dónde | Cómo se reduce |
|---|---|---|
| No sabe cuánto cuesta | Ficha de domo | Precio visible arriba, con calendario — sin "consultar precio" |
| No confía todavía | Objeción #1 | RNT + fotos reales + mecanismo anti-doble-reserva visible |
| No sabe qué pasa después de pagar | /reservar, final | Confirmación en pantalla + correo, explicitado antes de pagar |
| Formulario pide demasiado | /reservar, datos | Solo 5 campos: nombre, contacto, # huéspedes, mascota sí/no, notas — todos indispensables |
| No encuentra la política de cancelación | Objeción #2 | Visible antes de pagar, no en términos escondidos |

## 7 · Prueba social: ubicación

| Duda | Prueba | Dónde |
|---|---|---|
| "¿Esto es real?" | Fotos reales + RNT | Ficha de domo, /nosotros |
| "¿Son serios?" | RNT + 2 años operando | /nosotros, footer |
| "¿Qué tan bueno es?" | Sin testimonios aún — se compensa con mecanismo (calendario en vivo) | Ficha de domo, junto al precio |
| "¿Vale lo que cuesta?" | Incluido/no incluido + extras con precio propio | Ficha de domo |

## 8 · Anti-patrones — verificados, ninguno presente

- [x] Sin carrusel automático en el hero
- [x] Sin pop-up inmediato al entrar
- [x] Menú de 5 opciones (bajo el límite de 6)
- [x] Color de acento solo en botones, en ningún otro lado
- [x] CTA repetido antes de cada objeción resuelta, no solo al final
