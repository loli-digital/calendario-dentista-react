
function CTA() {

  return (

    <section className="w-full h-96 relative bg-[url(assets/img/armario-medico-totalmente-equipado.jpg)] bg-top bg-fixed bg-cover">

      {/* Container con sombra encima de la imagen */}
      <div className="w-full h-96 absolute top-0 bg-cyan-950/90"></div>

      <div className="w-full h-96 relative flex flex-col justify-center items-center gap-12">
        <h2 className="text-3xl text-center text-cyan-50 font-bold px-5 sm:px-0">Tratamientos personalizados para resultados duraderos</h2>

        {/* Botón para reservar cita */}
        <a routerLink="/reserva"
          className="bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600">
          Reserva cita ya
        </a>
      </div>
    </section>

  );
}

export default CTA;