import "./ProfessionalCard.css";

export function ProfessionalCard({
  imgAVIF,
  imgWEBP,
  img,
  alt,
  name,
  numCollegiate,
  specialization1,
  specialization2,
  specialization3,
  studies,
  experience,
}) {
  return (
    <article className="professional-card">
      <picture>
        <source srcSet={imgAVIF} type="image/avif" />
        <source srcSet={imgWEBP} type="image/webp" />
        <img
          loading="lazy"
          src={img}
          alt={alt}
        />
      </picture>

      <div className="professional-card__container-info">
        <h3 className="professional-card__container-info--h3">{name}</h3>
        <p className="professional-card__container-info--p">{numCollegiate}</p>
        <p>Especialización en:</p>
        <ul className="professional-card__container-info--specialization-list">
          <li>{specialization1}</li>
          <li>{specialization2}</li>
          <li>{specialization3}</li>
        </ul>
        <ul className="professional-card__container-info--details">
          <li>Universidad de {studies}</li>
          <li>
            Más de {experience} años de experience
          </li>
        </ul>
      </div>
    </article>
  );
}
