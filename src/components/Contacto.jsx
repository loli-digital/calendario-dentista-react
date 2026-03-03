

function Contacto() {

  return (

    <section className='w-full bg-cyan-50'>

      <h2 className='py-10 text-cyan-800 text-center text-4xl font-bold'>CONTACTO</h2>

      <div className='w-full md:h-[450px] flex flex-col-reverse sm:flex-row-reverse'>

        {/* Mapa */}
        <iframe className='w-full sm:w-5/6 md:4/6 xl:w-5/6 h-96 sm:h-[439px] md:h-full'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8710.979533507552!2d-0.4113538850465324!3d39.47392921572611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f77b8e29bf5%3A0xa22fcf1816c17f1b!2sC.%20Valencia%2C%2013%2C%2046920%20Valencia!5e0!3m2!1ses!2ses!4v1764349932017!5m2!1ses!2ses'
          allowFullScreen='' loading='lazy' referrerPolicy='no-referrer-when-downgrade'></iframe>

        {/* Datos contacto */}
        <div className='w-full sm:w-2/6 md:w-2/6 xl:w-2/6 sm:h-full xs:px-5 p-10 bg-cyan-800 text-white text-left flex flex-wrap justify-between md:block'>
          <article className='mb-10'>
            <h3 className='mb-3 font-bold text-2xl'>HORARIO</h3>
            <p className='mb-2 font-bold'>Lunes a Viernes</p>
            <p className='mb-2'>9:00h - 20:00h</p>
            <p className='mb-2 font-bold'>Sábado y Domingo</p>
            <p>Cerrado</p>
          </article>
          <article>
            <h3 className='mb-3 font-bold text-2xl'>CONTACTO</h3>
            <p className='mb-2'>
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='w-4 h-4 mr-1 inline-block align-middle fill-cyan-950'>
                  {/* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.  */}
                  <path
                    d='M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z' />
                </svg>
              </span>
              C/ Valencia, 13 (Valencia)
            </p>
            <p className='mb-2'><span>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'
                className='w-4 h-4 mr-1 fill-cyan-950 inline-block align-middle'>
                {/* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                <path
                  d='M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z' />
              </svg>
            </span>
              963 963 963</p>
            <p><span>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'
                className='w-4 h-4 mr-1 fill-cyan-950 inline-block align-middle'>
                {/* Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                <path
                  d='M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z' />
              </svg>
            </span>789 789 789</p>
          </article>
        </div>
      </div>

    </section>
  );
}

export default Contacto;