import { Link } from 'react-router-dom';

function MisCitas() {

  return (

    <section className='w-full min-h-screen py-10 px-5'>

      <h2 className='py-10 text-cyan-800 text-center text-4xl font-bold'>Mis citas</h2>

      <div className="max-w-3xl mx-auto pt-5 flex flex-col justify-center items-center gap-20">
        {/* Aquí iría la lista de citas */}
        <p className="text-center text-gray-600">
          Todavía no tienes citas reservadas.
        </p>

        {/* Botón escritorio */}
        <div className=''>
          <Link
            to='/reserva'
            className='bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600'
          >
            Reserva cita ya
          </Link>
        </div>

      </div>

    </section>

  );
}

export default MisCitas;