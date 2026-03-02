import { Link } from 'react-router-dom';

function MisCitas() {

  const citas = JSON.parse(localStorage.getItem("citas")) || [];
  const [telefonoBusqueda, setTelefonoBusqueda] = useState('');
  const citasUsuario = citas.filter(c => c.telefono === telefonoBusqueda);

  return (

    <section className='w-full min-h-screen py-10 px-5 bg-cyan-50'>

      <h2 className='py-10 text-cyan-800 text-center text-4xl font-bold'>Mis citas</h2>

      <div className="max-w-3xl mx-auto pt-5 flex flex-col justify-center items-center gap-20">
        
        {/* Citas */}
        
        

        {/* Botón "Reservar cita" */}
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