
import HeroSection from "../components/HeroSection";
import Servicios from "../components/Servicios";
import CTA from "../components/CTA";
import Profesionales from "../components/Profesionales";
import Reviews from '../components/Reviews';
import Contacto from "../components/Contacto";


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