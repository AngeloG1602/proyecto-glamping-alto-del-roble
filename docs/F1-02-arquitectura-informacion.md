# F1-02 · Arquitectura de Información — Glamping Alto del Roble

> Paso 9 · Sprint 0. Cerrado — 21 sep 2026. Depende de F0-02, F0-04, F1-01.

## 1 · Mapa del sitio

```
/                          [MVP]  Inicio
├── /domos                 [MVP]  Listado de los 6 domos con comparador
│   └── /domos/[slug]      [MVP]  Ficha individual: galería, tarifa, disponibilidad
├── /experiencias          [MVP]  Cena, masaje, decoración — se compran en /reservar
├── /reservar               [MVP]  Flujo de reserva (fechas → extras → datos → pago)
│   └── /confirmacion       [MVP]  Comprobante — dispara medición
├── /como-llegar            [MVP]  Cómo llegar, qué llevar, mascotas, check-in/out
├── /nosotros                [MVP]  Andrés y Mariana, RNT visible
├── /politica-de-privacidad  [MVP]  Legal
│
├── /panel                   [MVP · PRIVADO]  Un solo rol
│   ├── /panel/calendario    Calendario maestro, bloqueo de fechas
│   └── /panel/reservas      Gestión de reservas activas
│
├── /en/*                    [FASE 2]  Versión en inglés
└── /panel/precios           [FASE 2]  Precios por temporada en UI
```

**Por qué existe `/experiencias` aparte:** el problema #1 del negocio (F0-02 §8, F0-04 §5) es que nadie sabe que existen los extras hasta llegar. Sin una página propia, un visitante que entra directo a un domo nunca se entera. `/experiencias` genera el deseo antes; `/reservar` lo cobra.

## 2 · Contenido por página (las tres críticas)

### Ficha de domo · `/domos/[slug]`
**Acción principal:** iniciar reserva.
1. Galería (banco de Instagram)
2. Precio + disponibilidad — calendario embebido, única fuente de verdad
3. Descripción propia (no genérica)
4. Vista previa de extras → enlaza a `/experiencias`
5. Cómo llegar (resumen)
6. Sello de confianza: RNT + reseñas propias

**Sin scroll en móvil:** foto principal, precio, botón "Ver disponibilidad y reservar".

### Reservar · `/reservar`
```
Entrada (domo+fechas preseleccionados)
→ Paso 1: confirma fechas, calendario bloquea lo ya tomado en tiempo real
→ Paso 2: se ofrecen los 3 extras, opcional
→ Paso 3: datos del huésped (# acompañantes, mascota sí/no)
→ Paso 4: pago (Wompi)
→ Salida: /confirmacion — comprobante + correo
```
**Qué pasa si abandona a mitad:** no queda reserva — el bloqueo solo se confirma con pago exitoso.

### Inicio · `/`
1. Hero + CTA "Ver domos"
2. Los 6 domos (tarjetas)
3. Extras destacados
4. Confianza: RNT, reseñas propias, "cada reserva directa te ahorra la comisión"
5. Cómo llegar (preview)
6. Footer

## 3 · Navegación
**Menú:** Domos · Experiencias · Cómo llegar · Nosotros · **[Reservar]**
**Móvil:** hamburguesa, botón Reservar siempre visible y fijo
**Footer:** contacto, WhatsApp, RNT, redes, política de privacidad, mascotas sí

## 4 · Contenido: quién lo produce
| Sección | Lo escribe | Estado |
|---|---|---|
| Domos y extras | Nosotros + IA, cliente aprueba (F1-05) | Pendiente |
| Cómo llegar / políticas | Nosotros, a partir de F0-06 | Pendiente de datos del cliente |
| Legal | Se especifica, la revisa un abogado | Pendiente |

## 5 · Wireframes
Resuelto en F1-06 (recorrido visual, above the fold).
