import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

function MisCitasLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Inicio de sesión correcto');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (

        <section className='w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center overflow-hidden bg-cyan-50'>

            {/* Forma para detrás de las cards */}

            <div className='w-xl absolute top-40 lg:top-20 z-0 pointer-events-none drop-shadow-[0_0_4px] drop-shadow-cyan-800'>
                <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
                    <path fill='#CEFAFE'
                        d='M42.7,-71.6C55.9,-66.2,67.8,-56.1,73.8,-43.4C79.9,-30.6,80.2,-15.3,77.8,-1.4C75.4,12.6,70.3,25.1,65,39.1C59.7,53.1,54.1,68.6,43.2,78.6C32.3,88.6,16.2,93.2,0.4,92.5C-15.4,91.8,-30.8,85.9,-42.7,76.5C-54.7,67.1,-63.2,54.2,-71.7,40.9C-80.2,27.6,-88.7,13.8,-91.2,-1.4C-93.6,-16.6,-90,-33.2,-80.3,-44.6C-70.6,-55.9,-54.9,-61.9,-40.5,-66.6C-26.1,-71.2,-13.1,-74.5,0.8,-75.9C14.7,-77.3,29.4,-76.9,42.7,-71.6Z'
                        transform='translate(100 100)' />
                </svg>
            </div>


            <h1 className='py-10 relative text-cyan-800 text-center text-4xl font-bold'>Inicia sesión</h1>

            <form className='w-87.5 lg:w-l mx-auto relative flex flex-col justify-center space-y-5'>

                <label htmlFor='email' className='font-medium text-cyan-800'>Email</label>
                <input type='email'
                    name='email'
                    id='email'
                    placeholder='hola@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='email'
                    className='border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white' />

                <label htmlFor='password' className='font-medium text-cyan-800'>Contraseña</label>
                <input type='password'
                    name='password'
                    id='password'
                    placeholder='Escribe tu contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                    className='border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white' />

                <button onClick={handleRegister}
                    className='w-40 mx-auto p-3 mt-5 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600'>
                    Iniciar sesión
                </button>

                {/* Crear nueva cuenta */}
                <p className='mt-5 text-cyan-800 text-center text-m font-bold'>Crea una cuenta si eres un/a paciente nuevo/a </p>

                <Link to='/mis-citas/nueva-cuenta' className='mx-auto p-3'>
                    <button onClick={handleRegister}
                        className='w-40 p-3 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600'>
                        Crear cuenta
                    </button>
                </Link>
            </form>

        </section>

    );

};

export default MisCitasLogin;