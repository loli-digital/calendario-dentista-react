import { RatingStars } from "../RatingStars/RatingStars";
import "./ReviewsCard.css";

export function ReviewsCard({ imagen, alt, nombre, rating, texto }) {
  return (
    <div className="swiper-slide">
      <article className="reviews-card">
        <img
          src={imagen}
          alt={alt}
          loading="lazy"
        />

        <h3 className="reviews-card__h3">{nombre}</h3>

        {/* Container estrellas */}

        <div className="reviews-card__container-stars">
          <RatingStars rating={rating} />
        </div>

        {/* Texto reseña */}
        <p>{texto}</p>
      </article>
    </div>
  );
}
