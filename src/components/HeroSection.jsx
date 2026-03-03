import { Link } from "react-router-dom";


function HeroSection() {

  return (

    <div className='w-full h-96 lg:h-[90dvh] relative flex flex-nowrap justify-center md:justify-between items-center bg-cyan-100 overflow-hidden'>

      {/* Imagen de la mujer */}
      <div className='slide-in-bottom absolute inset-0 bg-[url("./assets/img/chica-feliz-senalando-con-el-dedo-la-boca-mostrando-dientes-blancos-perfectos-y-una-hermosa-sonrisa.png")] bg-no-repeat bg-position-[90%_top] bg-contain z-20 pointer-events-none drop-shadow-[0_0_5px] drop-shadow-cyan-950 opacity-0 md:opacity-100'>
      </div>

      {/* Forma detrás de la imagen */}
      <div className='w-96 lg:w-xl xl:w-2xl absolute top-0 md:right-8 lg:right-0 xl:right-8 z-10 opacity-10 md:opacity-100 pointer-events-none'>
        <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
          <path fill='#005f78'
            d='M44.7,-62.1C58,-51.7,69.2,-38.9,76.2,-23.3C83.3,-7.8,86.2,10.6,80.9,26.1C75.6,41.6,62.1,54.2,47.3,64.8C32.4,75.3,16.2,83.7,0.4,83.1C-15.3,82.5,-30.7,72.9,-45.7,62.4C-60.7,52,-75.4,40.6,-82.3,25.4C-89.1,10.1,-88.1,-9.1,-82.5,-27C-77,-45,-67,-61.7,-52.5,-71.7C-38,-81.7,-19,-85,-1.7,-82.7C15.6,-80.4,31.3,-72.5,44.7,-62.1Z'
            transform='translate(100 100)' />
        </svg>
      </div>

      {/* Contenido */}
      <div className='slide-in-top w-full md:w-1/2 h-96 lg:h-[90dvh] px-10 xl:px-20 flex flex-col justify-center items-center gap-10 md:gap-16 text-cyan-800 z-0'>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center'>Tu salud dental, nuestra prioridad</h1>
        <p className='text-xl text-center'>Agenda online fácil y rápida, con profesionales de confianza</p>
        <Link
          to='/reserva'
          className='bg-cyan-700 text-white p-3 rounded-sm shadow-[0_0_5px_black] z-50'
        >
          Reserva tu cita
        </Link>
      </div>
    </div>
  );

}

export default HeroSection;