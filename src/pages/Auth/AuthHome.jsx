import { Link } from "react-router-dom";
import { DecorativeShape } from "@/components";

function AuthHome() {
  return (
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center gap-10 overflow-hidden bg-cyan-50">
      
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

      <h1 className="title__section">
        Mis Citas
      </h1>

      <div className="max-w-3xl mx-auto relative flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* Card izquierda */}
        <div className="w-70 h-60 rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white p-6 flex flex-col justify-center items-center gap-7">
          <h2 className="text-cyan-800 text-center text-2xl font-bold">
            Acceso rápido
          </h2>
          <p className="text-sm text-cyan-950">Accede con tu teléfono móvil</p>

          <Link to="/mis-citas/telefono">
            <button className="w-40 mx-auto p-3 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600">
              Buscar
            </button>
          </Link>
        </div>

        {/* Card derecha */}
        <div className="w-70 h-60 rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-slate-50 p-6 flex flex-col justify-center items-center gap-7">
          <h2 className="text-cyan-800 text-center text-2xl font-bold">
            Cuenta personal
          </h2>
          <p className="text-sm text-cyan-950">
            Entra con tu cuenta o crea una nueva
          </p>

          {/*<Link to='/mis-citas/login'>*/}
          <button
            diabled
            className="w-40 mx-auto p-3 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-gray-500 text-white  hover:bg-gray-600 cursor-not-allowed"
          >
            Próximamente
          </button>
          {/*</Link>*/}
        </div>
      </div>
    </section>
  );
}

export default AuthHome;
