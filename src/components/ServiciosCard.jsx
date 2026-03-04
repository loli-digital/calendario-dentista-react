
function ServiciosCard({imagenAVIF, imagenWEBP, imagen, alt, icono, titulo, descripcion}) {

  return (

    <article
      className='w-72 h-96 shadow-[0_0_10px] shadow-cyan-950 rounded-lg transition-all duration-200 ease-in-out hover:shadow-[0_0_20px] cursor-pointer'>

      <picture>
        <source srcSet={ imagenAVIF } type='image/avif' />
        <source srcSet={ imagenWEBP } type='image/webp' />
        <img loading='lazy' src={ imagen }
          alt={ alt } className='w-full h-full rounded-t-lg' />
      </picture>

      <div className='p-4 pb-5 relative border-b-2 border-x-2 border-cyan-800 rounded-b-lg bg-white'>
        <div className='p-3 bg-white absolute -top-7 left-2 border-2 border-cyan-800 rounded-full'>

          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' className='w-6 h-6 fill-cyan-800'>
            {/* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
            <path d={ icono } />
          </svg>
        </div>
        <h3 className='text-3xl font-bold my-3 text-cyan-800'>{ titulo }</h3>
        <p className='text-black'>{ descripcion }</p>
      </div>
    </article>

  );
}

export default ServiciosCard;