import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPhone } from "@fortawesome/free-solid-svg-icons";

export function Contacto() {
  const color = "#053345";

  return (
    <section className="w-full bg-cyan-50">
      <h2 className="py-10 text-cyan-800 text-center text-4xl font-bold">
        CONTACTO
      </h2>

      <div className="w-full md:h-[450px] flex flex-col-reverse sm:flex-row-reverse">
        {/* Mapa */}
        <iframe
          className="w-full sm:w-5/6 md:4/6 xl:w-5/6 h-96 sm:h-[439px] md:h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8710.979533507552!2d-0.4113538850465324!3d39.47392921572611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f77b8e29bf5%3A0xa22fcf1816c17f1b!2sC.%20Valencia%2C%2013%2C%2046920%20Valencia!5e0!3m2!1ses!2ses!4v1764349932017!5m2!1ses!2ses"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación de la empresa"
        ></iframe>

        {/* Datos contacto */}
        <div className="w-full sm:w-2/6 md:w-2/6 xl:w-2/6 sm:h-full xs:px-5 p-10 bg-cyan-800 text-white text-left flex flex-wrap justify-between md:block">
          <article className="mb-10">
            <h3 className="mb-3 font-bold text-2xl">HORARIO</h3>
            <p className="mb-2 font-bold">Lunes a Viernes</p>
            <p className="mb-2">9:00h - 20:00h</p>
            <p className="mb-2 font-bold">Sábado y Domingo</p>
            <p>Cerrado</p>
          </article>
          <article>
            <h3 className="mb-3 font-bold text-2xl">CONTACTO</h3>
            <p className="mb-2">
              <span className="mr-1">
                <FontAwesomeIcon icon={faHouse} color={color} />
              </span>
              C/ Valencia, 13 (Valencia)
            </p>
            <p className="mb-2">
              <span className="mr-1">
                <FontAwesomeIcon icon={faPhone} color={color} />
              </span>
              963 963 963
            </p>
            <p>
              <span className="mr-1">
                <FontAwesomeIcon icon={faPhone} color={color} />
              </span>
              789 789 789
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
