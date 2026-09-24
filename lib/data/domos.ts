/**
 * Datos hardcodeados de la etapa local (sin base de datos).
 *
 * Los tipos replican los modelos `Domo` y `Extra` de docs/F2-02-arquitectura-datos.md §2
 * campo por campo, para que migrar al seed de Prisma sea copiar estos arreglos.
 *
 * ⚠️ CONTENIDO DE EJEMPLO: nombres, descripciones y capacidades son borrador (F2-02 §5:
 * "nombre y fotos genéricas, editables después"). Las fotos son ilustraciones generadas para
 * el caso ficticio, hasta tener el banco de Instagram del cliente. Los precios de los extras
 * sí son reales (F2-01 regla 5).
 */

export type Domo = {
  id: string;
  slug: string;
  nombre: string;
  descripcionCorta: string;
  descripcionLarga: string;
  /** Huéspedes máximos */
  capacidad: number;
  /** Arreglo de URLs */
  fotos: string[];
};

export type Extra = {
  id: string;
  nombre: string;
  /** Pesos colombianos, sin decimales */
  precio: number;
  descripcion: string;
};

/** Ilustraciones generadas para el caso ficticio, en /public/fotos (1600×1200) */
const foto = (nombre: string) => `/fotos/${nombre}.jpg`;
const fotosDomo = (clave: string) => [1, 2, 3, 4].map((n) => foto(`${clave}-${n}`));

/** Foto principal del inicio */
export const FOTO_HERO = foto("hero");
/** Foto de fondo del bloque final de reserva en el inicio */
export const FOTO_CIERRE = foto("tomine-1");
/** Foto de paisaje para /nosotros */
export const FOTO_PAISAJE = foto("paisaje-represa");

export const DOMOS: Domo[] = [
  {
    id: "248e3617-25da-4192-884a-b7d7231a95eb",
    slug: "domo-roble",
    nombre: "Domo Roble",
    descripcionCorta: "El más cercano al borde, con la represa de frente desde la cama.",
    descripcionLarga:
      "El Domo Roble está en el punto más alto del terreno, a pocos pasos del borde. La cama mira hacia la ventana panorámica, así que la represa es lo primero que ves al abrir los ojos. Tiene terraza privada con dos sillas para el café de la mañana y una malla colgante para cuando cae la tarde.",
    capacidad: 2,
    fotos: fotosDomo("roble"),
  },
  {
    id: "336c3279-e341-426c-a625-00fe26d3834c",
    slug: "domo-encenillo",
    nombre: "Domo Encenillo",
    descripcionCorta: "Rodeado de árboles nativos, el más reservado de los seis.",
    descripcionLarga:
      "El Domo Encenillo quedó entre un bosquecito de encenillos, separado de los demás por un sendero corto. Es el que elige quien quiere silencio de verdad: no se ve otro domo desde la terraza. La represa aparece entre los árboles, y de noche el cielo se ve sin luces alrededor.",
    capacidad: 2,
    fotos: fotosDomo("encenillo"),
  },
  {
    id: "5c174c5e-3fee-46c1-97c9-d35648e11f22",
    slug: "domo-arrayan",
    nombre: "Domo Arrayán",
    descripcionCorta: "Con tina de agua caliente en la terraza, mirando al atardecer.",
    descripcionLarga:
      "El Domo Arrayán está orientado hacia el occidente: el sol se esconde detrás de las montañas justo frente a su terraza. Tiene tina de agua caliente al aire libre, cubierta, para usar aunque llueva. Adentro, cama doble, chimenea de leña y ventana panorámica hacia la represa.",
    capacidad: 2,
    fotos: fotosDomo("arrayan"),
  },
  {
    id: "ac080640-fbae-4760-94a4-1047318d1657",
    slug: "domo-frailejon",
    nombre: "Domo Frailejón",
    descripcionCorta: "Doble altura con mirador interno para ver las estrellas.",
    descripcionLarga:
      "El Domo Frailejón tiene un segundo nivel tipo mezanine con colchón y una claraboya en el techo: de noche, si el cielo está despejado, te acuestas a ver las estrellas sin salir del domo. Abajo, cama doble y sala pequeña frente a la ventana que da a la represa.",
    capacidad: 3,
    fotos: fotosDomo("frailejon"),
  },
  {
    id: "316389bf-14e7-4ee0-a0bc-d5d2cb5e2b24",
    slug: "domo-sietecueros",
    nombre: "Domo Sietecueros",
    descripcionCorta: "El más amplio: cama doble más dos camas sencillas.",
    descripcionLarga:
      "El Domo Sietecueros es el más grande del glamping, pensado para viajar con amigos o con familia. Tiene cama doble, dos camas sencillas, baño privado amplio y una terraza con mesa para cuatro. La vista a la represa se comparte desde la ventana principal y desde la terraza.",
    capacidad: 4,
    fotos: fotosDomo("sietecueros"),
  },
  {
    id: "e5c80c1f-820b-4600-bb6a-79fd470c6186",
    slug: "domo-tomine",
    nombre: "Domo Tominé",
    descripcionCorta: "Con fogata privada y terraza amplia sobre la ladera.",
    descripcionLarga:
      "El Domo Tominé lleva el nombre de la represa que tiene al frente. Su terraza sobre la ladera es la más amplia del glamping y tiene fogata privada: nosotros dejamos la leña lista. Adentro, cama doble y un sofá cama, para una pareja o una pareja con un acompañante.",
    capacidad: 4,
    fotos: fotosDomo("tomine"),
  },
];

// Los 3 extras con precio real de F2-01 regla 5. Descripciones de EJEMPLO.
export const EXTRAS: Extra[] = [
  {
    id: "af60d77a-8049-4d1a-9545-cc0decc35a3f",
    nombre: "Cena romántica",
    precio: 180_000,
    descripcion:
      "Cena de tres tiempos para dos, servida en la terraza de tu domo con velas y la represa de fondo. Te preguntamos por alergias o restricciones antes de llegar.",
  },
  {
    id: "f3dcb4b1-d957-4b2f-aeba-6f5f597b05a3",
    nombre: "Masaje relajante",
    precio: 150_000,
    descripcion:
      "Masaje de relajación para dos, dentro de tu domo, con aceites naturales. Una hora para soltar la semana antes de la cena o después del desayuno.",
  },
  {
    id: "fcf2557d-8847-4f06-a0ea-0f119fc3f06f",
    nombre: "Decoración de aniversario",
    precio: 220_000,
    descripcion:
      "Llegas y el domo ya está listo: pétalos, luces cálidas, globos y una botella de vino espumoso. Para aniversarios, cumpleaños o una propuesta.",
  },
];

/** Foto de cada extra por id. No es parte del modelo F2-02. */
export const FOTOS_EXTRAS: Record<string, string> = {
  "af60d77a-8049-4d1a-9545-cc0decc35a3f": foto("extra-cena"),
  "f3dcb4b1-d957-4b2f-aeba-6f5f597b05a3": foto("extra-masaje"),
  "fcf2557d-8847-4f06-a0ea-0f119fc3f06f": foto("extra-decoracion"),
};

export function obtenerDomoPorSlug(slug: string): Domo | undefined {
  return DOMOS.find((domo) => domo.slug === slug);
}

export function obtenerDomoPorId(id: string): Domo | undefined {
  return DOMOS.find((domo) => domo.id === id);
}
