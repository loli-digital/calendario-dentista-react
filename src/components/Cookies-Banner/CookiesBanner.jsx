import { useState } from "react";
import { Link } from "react-router-dom";
import "./CookiesBanner.css";

export function CookiesBanner() {
  const [visible, setVisible] = useState(() => {
    // Verificar localStorage para mostrar el banner solo si no se ha aceptado antes
    return !localStorage.getItem("cookiesAceptadas");
  });

  const handleAccept = () => {
    localStorage.setItem("cookiesAceptadas", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookies-banner__container">
      <span className="md:text-lg">
        Utilizamos cookies propias para mejorar la experiencia de usuario y
        analizar el tráfico. Al continuar navegando aceptas nuestra{" "}
        <Link
          to="/privacidad"
          className="underline text-cyan-200 hover:text-cyan-100"
        >
          Política de Privacidad
        </Link>
        .
      </span>
      <button
        onClick={handleAccept}
        className="cookies-banner__button"
        aria-label="Aceptar cookies"
      >
        Aceptar
      </button>
    </div>
  );
}
