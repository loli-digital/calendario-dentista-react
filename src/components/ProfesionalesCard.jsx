

function ProfesionalCard({ imagenAVIF, imagenWEBP, imagen, alt, nombre, numColegiado, especializacion1, especializacion2, especializacion3, estudios, experiencia }) {

  return (

    <article className='w-full h-auto flex flex-col justify-center items-center gap-10'>

      <picture>
        <source srcSet={imagenAVIF} type='image/avif' />
        <source srcSet={imagenWEBP} type='image/webp' />
        <img loading='lazy' src={imagen}
          alt={alt} className='w-full drop-shadow-[0px_0px_7px] drop-shadow-cyan-950 transition-all duration-150 ease-in-out hover:scale-105' />
      </picture>

      <div className='w-full px-8 py-4 relative border-2 border-cyan-800 rounded-lg bg-white transition-all duration-200 ease-in-out shadow-[0_0_10px] shadow-cyan-950 hover:shadow-[0_0_20px]'>
        <h3 className='text-3xl text-center font-bold my-3 text-cyan-800'>{nombre}</h3>
        <p className='text-center'>{numColegiado}</p>
        <p>Especialización en:</p>
        <ul className='my-3 flex flex-wrap xl:flex-nowrap justify-center xl:justify-between items-center gap-5'>
          <li className='bg-cyan-950 text-white p-3 rounded-full'>{especializacion1}</li>
          <li className='bg-cyan-950 text-white p-3 rounded-full'>{especializacion2}</li>
          <li className='bg-cyan-950 text-white p-3 rounded-full'>{especializacion3}</li>
        </ul>
        <ul className='ml-3'>
          <li className='list-disc'>Universidad de {estudios}</li>
          <li className='list-disc'>Más de {experiencia} años de experiencia</li>
        </ul>
      </div>
    </article>
  );
}

export default ProfesionalCard;