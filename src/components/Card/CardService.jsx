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
    <article className="w-72 h-96 shadow-[0_0_10px] shadow-cyan-950 rounded-lg transition-all duration-200 ease-in-out hover:shadow-[0_0_20px]">
      <picture>
        <source srcSet={imgAVIF} type="image/avif" />
        <source srcSet={imgWEBP} type="image/webp" />
        <img
          loading="lazy"
          src={img}
          alt={alt}
          className="w-72 h-48 rounded-t-lg"
        />
      </picture>

      <div className="p-4 pb-5 relative border-b-2 border-x-2 border-cyan-800 rounded-b-lg bg-white">
        <div className="p-3 bg-white absolute -top-7 left-2 border-2 border-cyan-800 rounded-full">
          <FontAwesomeIcon icon={icon} aria-hidden="true" color={color} size="lg" />
        </div>
        <h3 className="text-3xl font-bold my-3 text-cyan-800">{title}</h3>
        <p className="text-black">{description}</p>
      </div>
    </article>
  );
}
