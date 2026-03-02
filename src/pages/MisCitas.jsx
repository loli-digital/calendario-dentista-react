import { useState } from 'react';

function MisCitas() {

  const [telefonoBusqueda, setTelefonoBusqueda] = useState('');
  const [citasPaciente, setCitasPaciente] = useState([]);
  const [error, setError] = useState('');

  const buscarCitas = (e) => {

    e.preventDefault();

    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];

    if (citasGuardadas.length === 0) {
      setError('Todavía no se ha reservado una cita');
      setCitasPaciente([]);
      return;
    }

    const filtradas = citasGuardadas.filter(
      (cita) => cita.telefono === telefonoBusqueda
    );

    if (filtradas.length === 0) {
      setError('No se han encontrado citas con ese número de teléfono.');
      setCitasPaciente([]);
      return;
    }

    filtradas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    setError('');
    setCitasPaciente(filtradas);
  };

  const eliminarCita = (id) => {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];

    // Filtrar fuera la cita eliminada
    const nuevasCitas = citasGuardadas.filter((cita) => cita.id !== id);

    // Guardar de nuevo
    localStorage.setItem('citas', JSON.stringify(nuevasCitas));

    // Actualizar la lista mostrada
    const nuevasCitasPaciente = citasPaciente.filter((cita) => cita.id !== id);
    setCitasPaciente(nuevasCitasPaciente);

    // Si ya no quedan citas para ese teléfono
    if (nuevasCitasPaciente.length === 0) {
      setError('Ya no tienes más citas reservadas');
    }
  };

  return (

    <section className='w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center gap-10 bg-cyan-50'>

      {/* Forma para detrás de las cards */}

      <div className='w-xl absolute top-40 lg:top-20 z-0 pointer-events-none drop-shadow-[0_0_4px] drop-shadow-cyan-800'>
        <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
          <path fill='#CEFAFE'
            d='M42.7,-71.6C55.9,-66.2,67.8,-56.1,73.8,-43.4C79.9,-30.6,80.2,-15.3,77.8,-1.4C75.4,12.6,70.3,25.1,65,39.1C59.7,53.1,54.1,68.6,43.2,78.6C32.3,88.6,16.2,93.2,0.4,92.5C-15.4,91.8,-30.8,85.9,-42.7,76.5C-54.7,67.1,-63.2,54.2,-71.7,40.9C-80.2,27.6,-88.7,13.8,-91.2,-1.4C-93.6,-16.6,-90,-33.2,-80.3,-44.6C-70.6,-55.9,-54.9,-61.9,-40.5,-66.6C-26.1,-71.2,-13.1,-74.5,0.8,-75.9C14.7,-77.3,29.4,-76.9,42.7,-71.6Z'
            transform='translate(100 100)' />
        </svg>
      </div>

      <h2 className='py-10 relative text-cyan-800 text-center text-4xl font-bold'>Mis citas</h2>

      <div className='max-w-3xl mx-auto relative flex flex-col justify-center items-center gap-20'>

        {/* Formulario búsqueda de cita */}
        <form onSubmit={buscarCitas} className='w-60 flex flex-col gap-10 justify-center items-center'>

          <label htmlFor='telefono' className='text-lg font-semibold text-cyan-800'>Introduce tu teléfono móvil:</label>
          <input
            id='telefono'
            type='tel'
            name='telefono'
            value={telefonoBusqueda}
            onChange={(e) => setTelefonoBusqueda(e.target.value)}
            placeholder='Ej: 123456789'
            required
            pattern='[0-9]{9}'
            title='Escribe un teléfono de 9 dígitos'
            className='border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white' />

          <input type='submit' value='Buscar cita' className='w-40 mx-auto bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600' />

        </form>

        {/* Mensaje de error */}
        {error && (
          <p>{error}</p>
        )}

        {/* Lista de citas */}
        {citasPaciente.length > 0 && (
          <div className='w-full max-w-xl flex flex-col gap-6'>
            {citasPaciente.map((cita) => (
              <div
                key={cita.id}
                className='bg-white text-cyan-700 border-2 border-cyan-700 rounded p-4 shadow'
              >
                <p><strong>Nombre y apellido/s:</strong> {cita.nombre} {cita.apellido}</p>
                <p><strong>Teléfono:</strong> {cita.telefono}</p>
                <p><strong>Servicio:</strong> {cita.servicio}</p>
                <p><strong>Profesional:</strong> {cita.profesional}</p>
                <p><strong>Día:</strong> {new Date(cita.fecha).toLocaleDateString('es-ES')}</p>
                <p><strong>Hora:</strong> {cita.hora}</p>

                <button
                  onClick={() => eliminarCita(cita.id)}
                  className="mt-3 bg-red-700 text-white p-2 rounded shadow shadow-red-950 hover:bg-red-600 transition-colors duration-200 ease-in cursor-pointer"
                >
                  Eliminar cita
                </button>

              </div>
            ))}
          </div>
        )}



      </div>

    </section>

  );
}

export default MisCitas;