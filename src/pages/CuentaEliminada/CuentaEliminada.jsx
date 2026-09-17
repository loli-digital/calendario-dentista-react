import { useNavigate } from "react-router-dom";
import { Button, DecorativeShape } from "@/components";

function CuentaEliminada() {
  const navigate = useNavigate();

  return (
    <section className="container__section">
      {/* Forma decorativa */}
      <DecorativeShape />
      <div className="z-0 flex flex-col justify-center items-center">
        <h2 className="title__section">Tu cuenta ha sido eliminada</h2>

        <p className="text-cyan-800 font-medium mb-10">Tu cuenta y tus datos han sido eliminados de nuestra base de datos.</p>

        <Button onClick={() => navigate("/auth")}>
          Crear una nueva cuenta
        </Button>
      </div>
    </section>
  );
}

export default CuentaEliminada;
