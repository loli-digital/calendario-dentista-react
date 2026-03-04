import { useState } from 'react';
import logo from '../assets/img/logo-clinica.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className='w-full h-24 relative flex justify-between items-center bg-cyan-950 px-4 md:px-8'>

      {/* Logo */}
      <div className='z-50'>
        <Link to='/'>
          <img
            src={logo}
            alt='Logo Clínica Dental Navarro'
            className='w-20 h-auto cursor-pointer lg:w-30'
          />
        </Link>
      </div>

      {/* Botón menú móvil */}
      <button
        onClick={toggleMenu}
        aria-label='Abrir menú de navegación'
        className='text-white text-3xl md:hidden focus:outline-none z-50'
      >
        {isMenuOpen ? (
          // Icono cerrar
          <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
              d='M6 18L18 6M6 6l12 12' />
          </svg>
        ) : (
          // Icono hamburguesa
          <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        )}
      </button>

      {/* Menú navegación */}
      <nav className={`w-full h-[550px] md:w-auto md:h-auto text-white text-lg absolute md:relative 
        top-0 left-0 bg-cyan-950 md:bg-transparent transition-all duration-500 ease-in-out 
        z-40 md:z-auto ${isMenuOpen ? 'block' : 'hidden'} md:block`}
      >
        <ul className='h-full md:h-auto mt-10 md:mt-0 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10 lg:gap-20 text-2xl md:text-lg'>

          <li className='nav-link'
            onClick={() => {
              document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
              closeMenu();
            }} >Servicios</li>

          <li className='nav-link'
            onClick={() => {
              document.getElementById("profesionales").scrollIntoView({ behavior: "smooth" });
              closeMenu();
            }} >Profesionales</li>

          <li className='nav-link'
            onClick={() => {
              document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
              closeMenu();
            }} >Contacto</li>

          <li className='nav-link'>
            <Link to='/mis-citas' onClick={closeMenu} >Mis citas</Link>
          </li>

          {/* Botón móvil */}
          <li className='block md:hidden mt-10 md:mt-0'>
            <Link
              to='/reserva'
              onClick={closeMenu}
              className='bg-cyan-700 text-white p-3 rounded-sm shadow-[0_0_5px_black] z-50'
            >
              Reserva cita ya
            </Link>
          </li>
        </ul>
      </nav>

      {/* Botón escritorio */}
      <div className='hidden md:block'>
        <Link
          to='/reserva'
          className='bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600'
        >
          Reserva cita ya
        </Link>
      </div>

    </header>
  );
}

export default Navbar;