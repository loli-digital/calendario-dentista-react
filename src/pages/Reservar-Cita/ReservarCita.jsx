import "@/App.css";
import { DecorativeShape, Button } from "@/components";
//import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function ReservarCita() {
  const phoneNumber = "34123456789";
  const message = encodeURIComponent("Hola! Me gustaría solicitar cita");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center overflow-hidden bg-cyan-50">
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

      <h1 className="title__section">¿Cómo quieres reservar?</h1>

      <div className="relative py-10 px-6 flex flex-col justify-center items-center gap-6 bg-white rounded-sm shadow-[0_0_5px_black] text-center text-cyan-800">
        <h2 className="py-3 text-2xl font-bold">
          <span aria-hidden="true" className="mr-2">
            <FontAwesomeIcon icon={faUser} />
          </span>
          Con tu cuenta
        </h2>
        <p className="font-medium">
          Gestiona tus citas, datos y facturas desde tu área personal
        </p>
        <Button to="/auth/login" className="w-40 mx-auto">
          Accede a tu cuenta
        </Button>

        <h2 className="py-3 text-2xl font-bold">
          <span aria-hidden="true" className="mr-2">
            <FontAwesomeIcon icon={faWhatsapp} />
          </span>
          Por WhatsApp
        </h2>
        <p className="font-medium">Solicita una cita sin crear una cuenta</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-green-600 px-5 py-3 text-white text-shadow-lg/10 transition-all duration-200 shadow-[0_0_5px_black] hover:shadow-[0_0_5px_#fff] hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          Reservar por WhatsApp
          <span class="sr-only">(se abre en una nueva pestaña)</span>
        </a>
      </div>
    </section>
  );
}

export default ReservarCita;
