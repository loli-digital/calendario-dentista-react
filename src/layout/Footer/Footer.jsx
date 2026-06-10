import logo from "@/assets/img/logo-clinica.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const year = new Date().getFullYear();
  const color = "#007595";

  return (
    <footer className="w-full h-full lg:h-50 relative bg-cyan-950 text-white text-lg text-center">
      {/* Contenido footer */}
      <div className="w-full h-full lg:h-50 py-10 lg:py-0 lg:px-5 flex flex-col lg:flex-row justify-around items-center gap-10 lg:gap-0">
        {/* Logo */}
        <div className="w-30 xl:w-40">
          <img
            src={logo}
            loading="lazy"
            alt="Logo Clínica Dental Navarro"
            className="w-30 xl:w-40 h-auto object-contain"
          />
        </div>

        {/* Dirección */}
        <div className="w-60">
          <div className="mb-4 flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faHouse} color={color} />
            <h3 className="text-xl">Dirección</h3>
          </div>
          <p>C/ Valencia, 13</p>
          <p>46920 Valencia, España</p>
        </div>

        {/* Teléfono */}
        <div className="w-60">
          <div className="mb-4 flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faPhone} color={color} />
            <h3 className="text-xl">Teléfono</h3>
          </div>
          <p>963 963 963</p>
          <p>789 789 789</p>
        </div>

        {/* Horario */}
        <div className="w-60">
          <div className="mb-4 flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faClock} color={color} />
            <h3 className="text-xl">Horario</h3>
          </div>
          <p>Lunes a viernes</p>
          <p>9:00h a 20:00h</p>
        </div>

        {/* Política de privacidad & Copyright & Redes sociales */}
        <div className="w-60 flex flex-col items-center gap-2">
          <Link to="/privacidad" className="hover:underline">
            Política de privacidad
          </Link>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.linkedin.com/in/loli-guerrero/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 hover:scale-110 transition-transform"
            >
              <FontAwesomeIcon
                icon={faSquareLinkedin}
                size="2x"
                color="#0e76a8"
              />
            </a>

            <a
              href="https://github.com/loli-digital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 hover:scale-110 transition-transform"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" color="#000" />
            </a>

            <a
              href="https://loli-digital.github.io/my-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
              className="w-8 h-8 hover:scale-110 transition-transform"
            >
              <FontAwesomeIcon icon={faBriefcase} size="2x" color="#007595" />
            </a>
          </div>

          <p className="mt-4 text-sm">
            &copy; {year} || Realizado por Loli G.F.
          </p>
        </div>
      </div>

      {/* Flecha hacia arriba */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className="w-10 h-10 absolute right-5 bottom-20 bg-cyan-700 flex justify-center items-center rounded-sm cursor-pointer transition-all duration-300 ease-in-out shadow-[0_0_10px] shadow-black hover:bg-cyan-600"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </footer>
  );
}

export default Footer;
