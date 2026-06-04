import HeroSection from "./sections/HeroSection";
import Servicios from "./sections/Servicios";
import CTA from "./sections/CTA";
import Profesionales from "./sections/Profesionales";
import Reviews from "./sections/Reviews";
import Contacto from "./sections/Contacto";

function Home() {
  return (
    <>
      <HeroSection />

      <section id="servicios">
        <Servicios />
      </section>

      <CTA />

      <section id="profesionales">
        <Profesionales />
      </section>

      <Reviews />

      <section id="contacto">
        <Contacto />
      </section>
    </>
  );
}

export default Home;
