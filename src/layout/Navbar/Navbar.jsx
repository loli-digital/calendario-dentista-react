import { useState } from "react";
import logo from "@/assets/img/logo-clinica.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();
  const isMisCitas = location.pathname.startsWith("/mis-citas");
  const isReservarCita = location.pathname.startsWith("/reservar-cita");
  const isRestrictedView = isMisCitas || isReservarCita;

  return (
    <header className="w-full h-24 relative flex justify-between items-center bg-cyan-950 px-4 lg:px-8">
      {/* Logo */}
      <div className="z-50">
        <Link to="/">
          <img
            src={logo}
            fetchPriority="high"
            alt="Logo Clínica Dental Navarro"
            className="w-20 xl:w-30 h-auto cursor-pointer object-contain"
          />
        </Link>
      </div>

      {/* Botón menú móvil */}
      <button
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="menu-principal"
        aria-label={
          isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
        }
        className="text-white text-3xl md:hidden focus:outline-none z-50"
      >
        {isMenuOpen ? (
          // Icono cerrar
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          // Icono hamburguesa
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>

      {/* Menú navegación */}
      <nav
        id="menu-principal"
        className={`w-full h-[550px] md:w-auto md:h-auto text-white text-lg absolute md:relative 
        top-0 left-0 bg-cyan-950 md:bg-transparent transition-all duration-500 ease-in-out 
        z-40 md:z-auto ${isMenuOpen ? "block" : "hidden"} md:block`}
      >
        <ul className="h-full md:h-auto mt-10 md:mt-0 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 lg:gap-20 text-2xl md:text-lg">
         
          {/* Si estoy en Home, mostrar este menú */}

          {!isRestrictedView && (
            <>
              <li>
                <button
                  className="nav-link"
                  onClick={() => {
                    document
                      .getElementById("servicios")
                      .scrollIntoView({ behavior: "smooth" });
                    closeMenu();
                  }}
                >
                  Servicios
                </button>
              </li>

              <li>
                <button
                  className="nav-link"
                  onClick={() => {
                    document
                      .getElementById("profesionales")
                      .scrollIntoView({ behavior: "smooth" });
                    closeMenu();
                  }}
                >
                  Profesionales
                </button>
              </li>

              <li>
                <button
                  className="nav-link"
                  onClick={() => {
                    document
                      .getElementById("contacto")
                      .scrollIntoView({ behavior: "smooth" });
                    closeMenu();
                  }}
                >
                  Contacto
                </button>
              </li>

              <li className="nav-link">
                <Link to="/mis-citas" onClick={closeMenu}>
                  Mis citas
                </Link>
              </li>
            </>
          )}

          {isRestrictedView && (
            <>
              <li className="nav-link">
                <Link to="/mis-citas" onClick={closeMenu}>
                  Mis citas
                </Link>
              </li>
            </>
          )}

          {/* Botón móvil */}
          <li className="block md:hidden mt-10 md:mt-0">
            <Button onClick={closeMenu} /> 
          </li>
        </ul>
      </nav>

      {/* Botón escritorio */}
      <div className="hidden md:block">
        <Button />
      </div>
    </header>
  );
}
