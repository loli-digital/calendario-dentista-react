function PoliticaPrivacidad() {
  return (
    <section className=" w-full bg-cyan-50">
      <div className="max-w-4xl mx-auto px-5 py-10 text-black">
        <h1 className="text-3xl font-bold mb-6 text-cyan-900">
          Política de Privacidad
        </h1>
        <p className="mb-4">
          En esta aplicación web de gestión de citas para clínica dental, la
          privacidad de los usuarios es importante. A continuación se explica
          qué datos se recogen, con qué finalidad y cómo se gestionan.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          1. Responsable del tratamiento
        </h2>
        <p className="mb-4">
          Este proyecto es una aplicación desarrollada con fines educativos y de
          portfolio por una desarrolladora frontend. No representa una clínica
          real ni una actividad comercial.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          2. Datos que se recogen
        </h2>
        <p className="mb-4">
          A través del formulario de reserva de citas se pueden recoger los
          siguientes datos personales:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Nombre</li>
          <li>Apellidos</li>
          <li>Número de teléfono</li>
          <li>Servicio solicitado</li>
          <li>Profesional seleccionado</li>
          <li>Fecha y hora de la cita</li>
        </ul>
        <p className="mb-4 italic text-cyan-800">
          Nota: No es necesario introducir un número de teléfono real para
          utilizar la aplicación. Puedes usar un número ficticio como{" "}
          <span className="font-semibold">123456789</span> para probar la
          funcionalidad.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          3. Finalidad del tratamiento
        </h2>
        <p className="mb-4">
          Los datos recogidos se utilizan exclusivamente para gestionar la
          reserva de citas dentro de la aplicación, permitiendo al usuario
          guardar, consultar y eliminar sus citas.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          4. Base legal
        </h2>
        <p className="mb-4">
          La base legal para el tratamiento de los datos es el consentimiento
          del usuario al completar y enviar el formulario.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          5. Almacenamiento de los datos
        </h2>
        <p className="mb-4">
          Los datos de las citas se almacenan únicamente en servicios externos
          de base de datos (Firebase). El único dato guardado en el
          almacenamiento local del navegador es la preferencia de aceptación del
          banner de cookies, que no contiene información personal.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          6. Conservación de los datos
        </h2>
        <p className="mb-4">
          Los datos se conservarán únicamente mientras sean necesarios para la
          gestión de las citas o hasta que el usuario los elimine manualmente.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          7. Derechos del usuario
        </h2>
        <p className="mb-4">
          El usuario puede acceder, modificar o eliminar sus datos directamente
          desde la aplicación mediante las funcionalidades disponibles.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          8. Seguridad
        </h2>
        <p className="mb-4">
          Se aplican medidas básicas para proteger los datos, aunque este
          proyecto no está destinado a uso comercial ni a tratar datos
          sensibles.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          9. Cambios en la política de privacidad
        </h2>
        <p className="mb-4">
          Esta política puede actualizarse para reflejar cambios en la
          aplicación o mejoras en la gestión de datos.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-900">
          10. Contacto
        </h2>
        <p>
          Para cualquier duda relacionada con esta política de privacidad,
          puedes contactar a través del perfil profesional de la desarrolladora,
          que se encuentra al pie de la página web.
        </p>
      </div>
    </section>
  );
}

export default PoliticaPrivacidad;
