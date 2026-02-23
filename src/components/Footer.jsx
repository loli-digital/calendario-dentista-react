import logo from '../assets/img/logo-clinica.png';

function Footer() {

  const year = new Date().getFullYear();

  return (

    <footer className='w-full h-full lg:h-50 relative bg-cyan-950 text-white text-lg text-center'>

      { /* Contenido footer */}
      <div className='w-full h-full lg:h-50 py-10 lg:py-0 lg:px-5 flex flex-col lg:flex-row justify-around items-center gap-10 lg:gap-0'>

        { /* Logo */}
        <div className='w-30 xl:w-40'>
          <img src={logo} alt='Logo Clínica Dental Navarro' className='w-30 xl:w-40 h-auto' />
        </div>

        { /* Dirección */}
        <div className='w-60'>
          <div className='mb-4 flex justify-center items-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-4 h-4 fill-cyan-700'>
              { /* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
              <path d='M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z' />
            </svg>

            <h3 className='text-xl'>Dirección</h3>

          </div>
          <p>C/ Valencia, 13</p>
          <p>46920 Valencia, España</p>

        </div>

        { /* Teléfono */}
        <div className='w-60'>
          <div className='mb-4 flex justify-center items-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-4 h-4 fill-cyan-700'>
              { /* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
              <path d='M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z' />
            </svg>

            <h3 className='text-xl'>Teléfono</h3>

          </div>
          <p>963 963 963</p>
          <p>789 789 789</p>

        </div>

        { /* Horario */}
        <div className='w-60'>
          <div className='mb-4 flex justify-center items-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-4 h-4 fill-cyan-700'>
              { /* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
              <path d='M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z' />
            </svg>

            <h3 className='text-xl'>Horario</h3>

          </div>
          <p>Lunes a viernes</p>
          <p>9:00h a 20:00h</p>

        </div>
        { /* Política de privacidad & Copyright */}
        <div className='w-60'>
          <a href='#' target='_blank'>Política de privacidad</a>
          <p className='mt-4 text-sm'>&copy; {year} || Realizado por Loli G.F.</p>
        </div>
      </div>

      { /* Flecha hacia arriba */}
      <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='w-10 h-10 absolute right-5 bottom-20 bg-cyan-700 flex justify-center items-center rounded-sm cursor-pointer transition-all duration-300 ease-in-out shadow-[0_0_10px] shadow-black hover:bg-cyan-100 fill-cyan-50 hover:fill-cyan-700'>

        <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
          { /* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
          <path d='M214.6 17.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 117.3 160 488c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z' />
        </svg>

      </div>

    </footer >
  );
}

export default Footer;