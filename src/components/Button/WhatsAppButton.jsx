import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./WhatsAppButton.css";

export const WhatsAppButton = () => {
  const phoneNumber = "34123456789";
  const message = encodeURIComponent("Hola! Me gustaría solicitar cita");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="whatsapp-button"
    >
      <span aria-hidden="true">
        <FontAwesomeIcon icon={faWhatsapp} />
      </span>
    </a>
  );
};
