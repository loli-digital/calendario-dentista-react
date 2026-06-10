import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingMedical,
  faMagnifyingGlass,
  faTeeth,
  faStar,
  faChildReaching,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";

export const serviciosCard = [
  {
    id: 1,
    imgAVIF: new URL(
      "@/assets/img/cerrar-dentista-ayudando-al-paciente.avif",
      import.meta.url,
    ).href,
    imgWEBP: new URL(
      "@/assets/img/cerrar-dentista-ayudando-al-paciente.webp",
      import.meta.url,
    ).href,
    img: new URL(
      "@/assets/img/cerrar-dentista-ayudando-al-paciente.jpg",
      import.meta.url,
    ).href,
    alt: "Dentista realizando limpieza bucal con instrumentos",
    icon: faHandHoldingMedical,
    title: "Limpieza",
    description:
      "Eliminación de placa y sarro para mantener dientes y encías sanas, previniendo caries y enfermedades periodontales",
  },
  {
    id: 2,
    imgAVIF: new URL(
      "@/assets/img/dentista-examinando-una-paciente-con-herramientas.avif",
      import.meta.url,
    ).href,
    imgWEBP: new URL(
      "@/assets/img/dentista-examinando-una-paciente-con-herramientas.webp",
      import.meta.url,
    ).href,
    img: new URL(
      "@/assets/img/dentista-examinando-una-paciente-con-herramientas.jpg",
      import.meta.url,
    ).href,
    alt: "Dentista examinando a una paciente con herramientas",
    icon: faMagnifyingGlass,
    title: "Revisión",
    description:
      "Evaluación completa de la salud bucal, detección temprana de problemas y planificación de tratamientos personalizados",
  },
  {
    id: 3,
    imgAVIF: new URL(
      "@/assets/img/disparo-de-dientes-de-nino-con-tirantes.avif",
      import.meta.url,
    ).href,
    imgWEBP: new URL(
      "@/assets/img/disparo-de-dientes-de-nino-con-tirantes.webp",
      import.meta.url,
    ).href,
    img: new URL(
      "@/assets/img/disparo-de-dientes-de-nino-con-tirantes.jpg",
      import.meta.url,
    ).href,
    alt: "Persona sonriendo con brackets en los dientes",
    icon: faTeeth,
    title: "Ortodoncia",
    description:
      "Corrección de la posición dental y mandibular mediante brackets o alineadores, mejorando estética y funcionalidad",
  },
  {
    id: 4,
    imgAVIF: new URL(
      "@/assets/img/dentista-revisando-un-hombre-adulto-medio-con-luz-ultravioleta-en-una-clinica-dental.avif",
      import.meta.url,
    ).href,
    imgWEBP: new URL(
      "@/assets/img/dentista-revisando-un-hombre-adulto-medio-con-luz-ultravioleta-en-una-clinica-dental.webp",
      import.meta.url,
    ).href,
    img: new URL(
      "@/assets/img/dentista-revisando-un-hombre-adulto-medio-con-luz-ultravioleta-en-una-clinica-dental.jpg",
      import.meta.url,
    ).href,
    alt: "Dentista realizando un blanqueamiento dental a un paciente",
    icon: faStar,
    title: "Estética dental",
    description:
      "Mejora de la apariencia de la sonrisa con blanqueamientos, carillas y técnicas mínimamente invasivas",
  },
  {
    id: 5,
    imgAVIF: new URL(
      "@/assets/img/paciente-nino-en-dentista.avif",
      import.meta.url,
    ).href,
    imgWEBP: new URL(
      "@/assets/img/paciente-nino-en-dentista.webp",
      import.meta.url,
    ).href,
    img: new URL(
      "@/assets/img/paciente-nino-en-dentista.jpg",
      import.meta.url,
    ).href,
    alt: "Niño sentado en la silla médica sonriendo",
    icon: faChildReaching,
    title: "Odontopediatría",
    description:
      "Atención especializada para niños, enfocada en prevención, tratamientos adaptados y educación en higiene oral",
  },
  {
    id: 6,
    imgAVIF: new URL(
      "@/assets/img/un-primer-plano-de-los-instrumentos-dentales.avif",
      import.meta.url,
    ).href,
    imgWEBP: new URL(
      "@/assets/img/un-primer-plano-de-los-instrumentos-dentales.webp",
      import.meta.url,
    ).href,
    img: new URL(
      "@/assets/img/un-primer-plano-de-los-instrumentos-dentales.jpg",
      import.meta.url,
    ).href,
    alt: "Instrumentos dentales",
    icon: faTooth,
    title: "Prótesis",
    description:
      "Reemplazo de piezas dentales ausentes con soluciones fijas o removibles, recuperando función y estética",
  },
];
