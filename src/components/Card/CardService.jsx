import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CardService({
  imgAVIF,
  imgWEBP,
  img,
  alt,
  icon,
  title,
  description,
}) {
  const color = "#005F78";

  return (
    <article className="services-card">
      <picture>
        <source srcSet={imgAVIF} type="image/avif" />
        <source srcSet={imgWEBP} type="image/webp" />
        <img loading="lazy" src={img} alt={alt} />
      </picture>

      <div className="services-card--container-info">
        <div className="services-card--icon">
          <FontAwesomeIcon
            icon={icon}
            aria-hidden="true"
            color={color}
            size="lg"
          />
        </div>
        <h3 className="services-card--h3">{title}</h3>
        <p className="services-card--p">{description}</p>
      </div>
    </article>
  );
}
