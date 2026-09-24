/**
 * Datos del negocio para la etapa local.
 *
 * ⚠️ CONTENIDO DE EJEMPLO salvo donde se indica la fuente: RNT, contacto, dirección,
 * horarios, política de cancelación, incluido/no incluido e historia son borradores
 * verosímiles para revisar el sitio. Se reemplazan con los datos reales del cliente
 * antes de publicar (F1-02 §4: "Pendiente de datos del cliente").
 */

export const NEGOCIO = {
  nombre: "Glamping Alto del Roble",
  /** EJEMPLO — número de Registro Nacional de Turismo pendiente del cliente */
  rnt: "000000",
  /** EJEMPLO — número de WhatsApp en formato internacional, sin signos */
  whatsapp: "573000000000",
  whatsappVisible: "+57 300 000 0000",
  /** EJEMPLO — dominio por confirmar (F2-01 §1) */
  correo: "reservas@altodelroble.com",
  /** EJEMPLO */
  instagram: "https://www.instagram.com/altodelroble",
  instagramUsuario: "@altodelroble",
  /** EJEMPLO */
  direccion: "Km 4 vía Guatavita – Sesquilé, vereda Tominé, Guatavita, Cundinamarca",
  /** Consulta para el mapa embebido (F2-03 I-03). EJEMPLO hasta tener la ubicación exacta. */
  mapaConsulta: "Embalse de Tominé, Guatavita, Cundinamarca",
  /** F1-06 §7: "2 años operando" */
  anosOperando: 2,
  /** EJEMPLO */
  checkIn: "3:00 p. m.",
  /** EJEMPLO */
  checkOut: "12:00 m.",
} as const;

export function enlaceWhatsApp(mensaje = "Hola, quiero información sobre Alto del Roble") {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** EJEMPLO — aplica a los 6 domos (F1-05 objeción #3) */
export const INCLUIDO = [
  "Desayuno campesino para los huéspedes, servido en tu domo",
  "Cama doble con lencería de algodón y cobijas de lana",
  "Baño privado con agua caliente",
  "Calentador o chimenea para la noche",
  "Terraza privada con vista a la represa",
  "Parqueadero dentro del glamping",
  "Wi-Fi en la zona común",
];

/** EJEMPLO */
export const NO_INCLUIDO = [
  "Almuerzo y cena (puedes agregar la cena romántica)",
  "Masaje y decoración (se agregan al reservar)",
  "Transporte desde Bogotá",
  "Actividades fuera del glamping (náuticas, tours a la laguna)",
];

/** EJEMPLO — política de cancelación (F1-05 objeción #2: visible antes de pagar) */
export const POLITICA_CANCELACION = {
  resumen: "Cancela gratis hasta 7 días antes de tu llegada.",
  puntos: [
    "Hasta 7 días antes de tu llegada: te devolvemos el 100% del pago.",
    "Entre 6 y 3 días antes: te devolvemos el 50%, o puedes cambiar la fecha una vez sin costo.",
    "A menos de 3 días: no hay devolución, pero puedes cambiar la fecha una vez, sujeto a disponibilidad.",
    "Si el glamping tiene que cancelar por fuerza mayor, te devolvemos el 100%.",
  ],
};

/** EJEMPLO — /como-llegar */
export const COMO_LLEGAR = {
  resumen:
    "Estamos en Guatavita, a unas 2 horas de Bogotá por la vía a Sesquilé. Los últimos 4 km son destapados pero transitables en cualquier carro.",
  rutas: [
    {
      titulo: "En carro desde Bogotá",
      texto:
        "Toma la Autopista Norte hacia Briceño y sigue la vía a Sesquilé. Pasando Sesquilé, gira hacia Guatavita y, en el km 4, toma el desvío señalizado hacia la vereda Tominé. Te enviamos la ubicación exacta por WhatsApp al confirmar.",
    },
    {
      titulo: "En transporte público",
      texto:
        "Desde el Portal Norte salen buses hacia Guatavita cada 30 minutos. En el pueblo te podemos coordinar un taxi hasta el glamping (unos 15 minutos).",
    },
  ],
  queLlevar: [
    "Ropa abrigada: de noche la temperatura baja a 8–10 °C",
    "Zapatos cómodos para caminar en pasto y tierra",
    "Linterna o la del celular para los senderos",
    "Bloqueador y gorra para el día",
    "Tus medicamentos personales",
  ],
  mascotas: [
    "Tu mascota es bienvenida, sin costo adicional",
    "Máximo una mascota por domo",
    "Con correa en las zonas comunes",
    "Trae su cama o cobija: no puede subir a la cama del domo",
  ],
};

/** EJEMPLO — /nosotros */
export const NOSOTROS = {
  historia: [
    "Somos Andrés y Mariana. Durante años salimos de Bogotá cada fin de semana buscando lo mismo: un lugar tranquilo, con buena vista y donde no tuviéramos que pensar en nada.",
    "En 2024 abrimos Alto del Roble en la finca de la familia de Andrés, frente a la represa de Tominé. Empezamos con dos domos y hoy tenemos seis, todos construidos y atendidos por nosotros.",
    "Nos gusta recibir a cada huésped en persona, recomendarte dónde comer en el pueblo y dejarte en paz el resto del tiempo. Eso es, para nosotros, desconectarse de verdad.",
  ],
};
