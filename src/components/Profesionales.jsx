import profesionales from '../data/profesionalesData';
import ProfesionalesCard from './ProfesionalesCard';

function Profesionales() {

  return (

    <section class='w-full h-auto py-10 sm:px-10 flex flex-col justify-center items-center bg-cyan-50'>

      <h2 class='py-10 text-cyan-800 text-center text-4xl font-bold'>PROFESIONALES</h2>

      <div class='px-5 flex flex-wrap md:flex-nowrap justify-center items-center gap-10'>

       {profesionales.map(profesional => (
          <ProfesionalesCard
            key={profesional.id}
            imagenAVIF={profesional.imagenAVIF}
            imagenWEBP={profesional.imagenWEBP}
            imagen={profesional.imagen}
            alt={profesional.alt}
            nombre={profesional.nombre}
            numColegiado={profesional.numColegiado}
            especializacion1={profesional.especializacion1}
            especializacion2={profesional.especializacion2}
            especializacion3={profesional.especializacion3}
            estudios={profesional.estudios}
            experiencia={profesional.experiencia}
          />
        ))}

      </div>

    </section>
  );

}

export default Profesionales;