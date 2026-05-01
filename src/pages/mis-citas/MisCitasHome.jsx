import { Link } from 'react-router-dom';

function MisCitasHome() {


    return (
        <section className='w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center gap-10 overflow-hidden bg-cyan-50'>

            {/* Forma para detrás de las cards */}

            <div className='w-xl absolute top-40 lg:top-20 z-0 pointer-events-none drop-shadow-[0_0_4px] drop-shadow-cyan-800'>
                <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
                    <path fill='#CEFAFE'
                        d='M42.7,-71.6C55.9,-66.2,67.8,-56.1,73.8,-43.4C79.9,-30.6,80.2,-15.3,77.8,-1.4C75.4,12.6,70.3,25.1,65,39.1C59.7,53.1,54.1,68.6,43.2,78.6C32.3,88.6,16.2,93.2,0.4,92.5C-15.4,91.8,-30.8,85.9,-42.7,76.5C-54.7,67.1,-63.2,54.2,-71.7,40.9C-80.2,27.6,-88.7,13.8,-91.2,-1.4C-93.6,-16.6,-90,-33.2,-80.3,-44.6C-70.6,-55.9,-54.9,-61.9,-40.5,-66.6C-26.1,-71.2,-13.1,-74.5,0.8,-75.9C14.7,-77.3,29.4,-76.9,42.7,-71.6Z'
                        transform='translate(100 100)' />
                </svg>
            </div>

            <h1 className='py-10 relative text-cyan-800 text-center text-4xl font-bold'>Mis Citas</h1>

            <div className='max-w-3xl mx-auto relative flex flex-col lg:flex-row justify-center items-center gap-10'>

                {/* Card izquierda */}
                <div className='w-70 h-60 rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white p-6 flex flex-col justify-center items-center gap-7'>
                    <h2 className='text-cyan-800 text-center text-2xl font-bold'>
                        Acceso rápido
                    </h2>
                    <p className='text-sm text-cyan-950'>
                        Accede con tu teléfono móvil
                    </p>

                    <Link to='/mis-citas/telefono'>
                        <button
                            className='w-40 mx-auto p-3 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600'
                        >
                            Buscar
                        </button>
                    </Link>

                </div>

                {/* Card derecha */}
                <div className='w-70 h-60 rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-slate-50 p-6 flex flex-col justify-center items-center gap-7'>
                    <h2 className='text-cyan-800 text-center text-2xl font-bold'>
                        Cuenta personal
                    </h2>
                    <p className='text-sm text-cyan-950'>
                        Entra con tu cuenta o crea una nueva
                    </p>

                    {/*<Link to='/mis-citas/login'>*/}
                        <button
                            diabled
                            className='w-40 mx-auto p-3 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-gray-500 text-white  hover:bg-gray-600 cursor-not-allowed'>
                            Próximamente
                        </button>
                     {/*</Link>*/}
                </div>

            </div>

        </section>
    );
}

export default MisCitasHome;