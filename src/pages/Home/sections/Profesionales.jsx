import { professionals } from "@/data";
import { ProfessionalCard } from "@/components";

export function Profesionales() {
  return (
    <section className="w-full h-auto py-10 sm:px-10 flex flex-col justify-center items-center bg-cyan-50">
      <h2 className="py-10 text-cyan-800 text-center text-4xl font-bold">
        PROFESIONALES
      </h2>

      <div className="px-5 flex flex-wrap lg:flex-nowrap justify-center items-center gap-10">
        {professionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            imgAVIF={professional.imgAVIF}
            imgWEBP={professional.imgWEBP}
            img={professional.img}
            alt={professional.alt}
            name={professional.name}
            numCollegiate={professional.numCollegiate}
            specialization1={professional.specialization1}
            specialization2={professional.specialization2}
            specialization3={professional.specialization3}
            studies={professional.studies}
            experience={professional.experience}
          />
        ))}
      </div>
    </section>
  );
}
