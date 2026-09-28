import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const WhatsAppButton = () => {
  const phoneNumber = "34789789789";
  const message = encodeURIComponent("Hola! Me gustaría solicitar cita");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-3xl text-white border-2 border-white transition-colors shadow-[0_0_5px_black] hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
    >
      <span aria-hidden="true">
        <FontAwesomeIcon icon={faWhatsapp} />
      </span>
    </a>
  );
};
