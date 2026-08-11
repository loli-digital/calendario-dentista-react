import { CardService } from "@/components";
import { services } from "@/data";
import { DecorativeShape } from "@/components";

export function Servicios() {
  
  return (
    <section className="w-full min-h-screen px-5 py-16 relative flex flex-col justify-center items-center gap-10 overflow-hidden bg-cyan-50">
      
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

      <h2 className="py-5 text-cyan-800 text-center text-4xl font-bold">
        SERVICIOS
      </h2>

      {/* Lista de servicios */}

      <div className="w-full xl:w-6xl lg:px-5 xl:px-0 flex flex-wrap justify-center items-center gap-16 lg:gap-10 xl:gap-16 z-20">
        {services.map((service) => (
          <CardService
            key={service.id}
            imgAVIF={service.imgAVIF}
            imgWEBP={service.imgWEBP}
            img={service.img}
            alt={service.alt}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}
