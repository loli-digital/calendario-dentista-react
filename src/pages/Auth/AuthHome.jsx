import { DecorativeShape, Button } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

function AuthHome() {
  return (
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center gap-10 overflow-hidden bg-cyan-50">
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

      <h1 className="title__section">Acceder a mis citas</h1>

      <div className="max-w-3xl mx-auto relative flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* Acceder a mis citas mediante el número de teléfono (SIN LOGIN) */}
        <div className="w-70 h-60 rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white p-6 flex flex-col justify-center items-center gap-7">
          <h2 className="text-cyan-800 text-center text-2xl font-bold">
            Acceso rápido
          </h2>
          <p className="text-sm text-cyan-950">Accede con tu teléfono móvil</p>

          <Button to="/auth/telefono" className="w-40" icon={faPhone}>
            Buscar
          </Button>
        </div>

        {/* Acceder a mis citas CON login */}
        <div className="w-70 h-60 rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-slate-50 p-6 flex flex-col justify-center items-center gap-7">
          <h2 className="text-cyan-800 text-center text-2xl font-bold">
            Cuenta personal
          </h2>
          <p className="text-sm text-cyan-950">
            Entra con tu cuenta o crea una nueva
          </p>

          <Button to="/auth/login" className="w-40" icon={faUser}>
            Acceder
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AuthHome;
