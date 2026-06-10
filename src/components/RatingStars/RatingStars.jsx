import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export function RatingStars({ rating }) {
  // Arrays de objetos con id único para evitar el warning de key
  const stars = [
    { id: "star-1" },
    { id: "star-2" },
    { id: "star-3" },
    { id: "star-4" },
    { id: "star-5" },
  ];

  const color = "#f59e0b";

  return (
    <div className="flex gap-1">
      {stars.map((item, i) => (
        <FontAwesomeIcon
          key={item.id}
          className="w-6 h-6 drop-shadow-black drop-shadow-[0_0_2px]"
          icon={faStar}
          color={i < rating ? color : "#d1d5dc"}
        />
      ))}
    </div>
  );
}
