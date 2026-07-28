import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import logo from "@/assets/img/logo-clinica.png";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();
  const isAcceder = location.pathname.startsWith("/auth");
  const isReservarCita = location.pathname.startsWith("/reservar-cita");
  const isRestrictedView = isAcceder || isReservarCita;

  const { user } = useContext(AuthContext);

  return (
    <header className="w-full h-24 relative flex justify-between items-center bg-cyan-950 px-4 lg:px-8">
      {/* Logo */}
      <div className="z-50">
        <NavLink to={user ? "/dashboard/mis-datos" : "/"}>
          <img
            src={logo}
            fetchPriority="high"
            alt="Logo Clínica Dental Navarro"
            className="w-20 xl:w-30 h-auto cursor-pointer object-contain"
          />
        </NavLink>
      </div>

      {/* Botón menú móvil */}
      <button
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="menu-principal"
        aria-label={
          isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
        }
        className="text-white text-3xl lg:hidden focus:outline-none z-50"
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
        className={`w-full h-[550px] lg:w-auto lg:h-auto text-white text-lg absolute lg:relative 
        top-0 left-0 bg-cyan-950 lg:bg-transparent transition-all duration-500 ease-in-out 
        z-40 lg:z-auto ${isMenuOpen ? "block" : "hidden"} lg:block`}
      >
        <ul className="h-full lg:h-auto mt-10 lg:mt-0 flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-10 lg:gap-20 text-2xl lg:text-lg">
          {/* Si estoy en Home y NO se ha iniciado sesión, mostrar este menú */}
          {!isRestrictedView && !user && (
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
                <NavLink to="/auth" onClick={closeMenu}>
                  Acceder
                </NavLink>
              </li>
            </>
          )}

          {/* Menú para Acceder y Reservar Cita */}
          {isRestrictedView && (
            <>
              <li className="nav-link">
                <NavLink to="/auth" onClick={closeMenu}>
                  Acceder
                </NavLink>
              </li>
            </>
          )}

          {/* Menú para cuando se ha hecho login */}
          {user && (
            <>
              <li className="nav-link" onClick={closeMenu}>
                <NavLink
                  to="/dashboard/mis-datos"
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Mi panel
                </NavLink>
              </li>
              <Button onClick={() => signOut(auth)}>
                Cerrar sesión
              </Button>
            </>
          )}

          {/* Botón para reservar cita que se encuentra dentro del menú móvil */}
          {!user && (
            <li className="block lg:hidden mt-10 lg:mt-0">
              <Button
                to="/reservar-cita"
                onClick={closeMenu}
                icon={faCalendarDays}
              >
                Reservar cita
              </Button>
            </li>
          )}
        </ul>
      </nav>

      {/* Botón para reservar cita en Desktop, excepto cuando se ha inciado sesión */}
      {!user && (
        <div className="hidden lg:block">
          <Button to="/reservar-cita" icon={faCalendarDays}>
            Reservar cita
          </Button>
        </div>
      )}
    </header>
  );
}
