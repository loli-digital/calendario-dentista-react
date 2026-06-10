import { profesionales } from "@/data";
import { ProfesionalesCard } from "@/components";

export function Profesionales() {
  return (
    <section className="w-full h-auto py-10 sm:px-10 flex flex-col justify-center items-center bg-cyan-50">
      <h2 className="py-10 text-cyan-800 text-center text-4xl font-bold">
        PROFESIONALES
      </h2>

      <div className="px-5 flex flex-wrap lg:flex-nowrap justify-center items-center gap-10">
        {profesionales.map((profesional) => (
          <ProfesionalesCard
            key={profesional.id}
            imgAVIF={profesional.imgAVIF}
            imgWEBP={profesional.imgWEBP}
            img={profesional.img}
            alt={profesional.alt}
            name={profesional.name}
            numCollegiate={profesional.numCollegiate}
            specialization1={profesional.specialization1}
            specialization2={profesional.specialization2}
            specialization3={profesional.specialization3}
            studies={profesional.studies}
            experience={profesional.experience}
          />
        ))}
      </div>
    </section>
  );
}
