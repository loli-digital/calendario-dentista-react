import { useState } from 'react';
import { Link } from 'react-router-dom';

function CookiesBanner() {
  const [visible, setVisible] = useState( () => {
    // Verificar localStorage para mostrar el banner solo si no se ha aceptado antes
    return !localStorage.getItem('cookiesAceptadas');
  });

  const handleAccept = () => {
    localStorage.setItem('cookiesAceptadas', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed bottom-0 left-0 w-full z-50 bg-cyan-900 text-white px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg animate-fadeIn'>
      <span className='text-base md:text-lg'>
        Utilizamos cookies propias para mejorar la experiencia de usuario y analizar el tráfico. Al continuar navegando aceptas nuestra <Link to='/privacidad' className='underline text-cyan-200 hover:text-cyan-100'>Política de Privacidad</Link>.
      </span>
      <button
        onClick={handleAccept}
        className='bg-cyan-700 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded shadow transition-colors duration-200'
        aria-label='Aceptar cookies'
      >
        Aceptar
      </button>
    </div>
  );
}

export default CookiesBanner;
