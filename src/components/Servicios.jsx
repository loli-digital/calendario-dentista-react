import ServiciosCard from './ServiciosCard';
import servicios from '../data/serviciosCardData';


function Servicios() {

  return (

    <section className='w-full min-h-screen px-5 py-16 relative flex flex-col justify-center items-center gap-10 bg-cyan-50'>

      {/* Forma para detrás de las cards */}

      <div className='w-5xl absolute top-40 lg:top-5 z-0 pointer-events-none drop-shadow-[0_0_4px] drop-shadow-cyan-800'>
        <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
          <path fill='#CEFAFE'
            d='M42.7,-71.6C55.9,-66.2,67.8,-56.1,73.8,-43.4C79.9,-30.6,80.2,-15.3,77.8,-1.4C75.4,12.6,70.3,25.1,65,39.1C59.7,53.1,54.1,68.6,43.2,78.6C32.3,88.6,16.2,93.2,0.4,92.5C-15.4,91.8,-30.8,85.9,-42.7,76.5C-54.7,67.1,-63.2,54.2,-71.7,40.9C-80.2,27.6,-88.7,13.8,-91.2,-1.4C-93.6,-16.6,-90,-33.2,-80.3,-44.6C-70.6,-55.9,-54.9,-61.9,-40.5,-66.6C-26.1,-71.2,-13.1,-74.5,0.8,-75.9C14.7,-77.3,29.4,-76.9,42.7,-71.6Z'
            transform='translate(100 100)' />
        </svg>
      </div>

      <h2 className='py-5 text-cyan-800 text-center text-4xl font-bold'>SERVICIOS</h2>

      {/* Lista de servicios */}

      <div className='w-full xl:w-6xl lg:px-5 xl:px-0 flex flex-wrap justify-center items-center gap-16 lg:gap-10 xl:gap-16 z-20'>

        {servicios.map(servicio => (
          <ServiciosCard
            key={servicio.id}
            imagenAVIF={servicio.imagenAVIF}
            imagenWEBP={servicio.imagenWEBP}
            imagen={servicio.imagen}
            alt={servicio.alt}
            icono={servicio.icono}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
          />
        ))}

      </div>

    </section>

  );
}

export default Servicios;