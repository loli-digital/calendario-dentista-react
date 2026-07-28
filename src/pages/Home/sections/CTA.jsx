import { Button } from "@/components";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

export function CTA() {
  return (
    <section className="w-full h-96 relative bg-[url(assets/img/armario-medico-totalmente-equipado.jpg)] bg-top bg-fixed bg-cover">
      {/* Container con sombra encima de la imagen */}
      <div className="w-full h-96 absolute top-0 bg-cyan-950/90"></div>

      <div className="w-full h-96 relative flex flex-col justify-center items-center gap-12">
        <h2 className="text-3xl text-center text-cyan-50 font-bold px-5">
          Tratamientos personalizados para resultados duraderos
        </h2>

        {/* Botón para reservar cita */}
        <Button to="/reservar-cita" icon={faCalendarDays}>
          Reserva tu cita
        </Button>
      </div>
    </section>
  );
}
