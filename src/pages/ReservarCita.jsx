import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "@/App.css";
import profesionales from "@/data";
import serviciosCita from "@/data";
import { validarTelefono } from "../utils/validarTelefono";
import { filtrarHorasPasadas } from "../utils/filtrarHorasPasadas";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase.js";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function ReservarCita() {
  // Estado para los inputs
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("");
  const [profesional, setProfesional] = useState("");
  const [fecha, setFecha] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [titleSubmit, setTitleSubmit] = useState(false);

  // Filtro de profesionales según el servicio
  const profesionalesDisponibles = profesionales.filter((profesional) =>
    profesional.servicios.includes(Number(servicio)),
  );

  // Para guardar los datos en base de datos Firebase
  const manejarSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de todos los campos
    if (!nombre || !apellido || !telefono || !servicio || !profesional) {
      setMensaje("Por favor, rellena todos los campos");
      setError(null);
      return;
    }

    // Validación del teléfono
    if (!validarTelefono(telefono)) {
      setMensaje("El teléfono introducido debe tener 9 dígitos");
      setLoading(false);
      setError(null);
      return;
    }

    // Mensaje error si intenta registrar una fecha inválida
    if (!fecha || fecha.getDay() === 0 || fecha.getDay() === 6) {
      setMensaje("Seleccione una fecha entre el lunes y el viernes");
      setError(null);
      return;
    }

    const servicioSeleccionado = serviciosCita.find(
      (s) => s.id === Number(servicio),
    );

    const profesionalSeleccionado = profesionales.find(
      (p) => p.id === profesional,
    );

    try {
      if (!servicioSeleccionado || !profesionalSeleccionado) {
        throw new Error(
          "No se encontró la información del servicio o profesional",
        );
      }

      setLoading(true);
      setError(null);
      setMensaje(null);

      await addDoc(collection(db, "citas"), {
        nombre,
        apellido,
        telefono,
        servicio: servicioSeleccionado.nombre,
        profesional: profesionalSeleccionado.nombre,
        fecha: Timestamp.fromDate(fecha),
        hora: fecha.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setTitleSubmit(true);

      // Muestra el mensaje de confirmación de cita
      setMensaje({
        nombre,
        apellido,
        telefono,
        servicio: servicioSeleccionado.nombre,
        profesional: profesionalSeleccionado.nombre,
        fecha: fecha.toLocaleDateString("es-ES"),
        hora: fecha.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Resetear formulario
      setNombre("");
      setApellido("");
      setTelefono("");
      setServicio("");
      setProfesional("");
      setFecha(null);
    } catch (err) {
      setError("Ocurrió un problema al reservar la cita. Inténtelo de nuevo.");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center overflow-hidden bg-cyan-50">
      {/* Forma para detrás de las cards */}

      <div className="w-xl absolute top-40 lg:top-00 z-0 pointer-events-none drop-shadow-[0_0_4px] drop-shadow-cyan-800">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#CEFAFE"
            d="M42.7,-71.6C55.9,-66.2,67.8,-56.1,73.8,-43.4C79.9,-30.6,80.2,-15.3,77.8,-1.4C75.4,12.6,70.3,25.1,65,39.1C59.7,53.1,54.1,68.6,43.2,78.6C32.3,88.6,16.2,93.2,0.4,92.5C-15.4,91.8,-30.8,85.9,-42.7,76.5C-54.7,67.1,-63.2,54.2,-71.7,40.9C-80.2,27.6,-88.7,13.8,-91.2,-1.4C-93.6,-16.6,-90,-33.2,-80.3,-44.6C-70.6,-55.9,-54.9,-61.9,-40.5,-66.6C-26.1,-71.2,-13.1,-74.5,0.8,-75.9C14.7,-77.3,29.4,-76.9,42.7,-71.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <h1 className="relative py-10 text-cyan-800 text-center text-4xl font-bold">
        {titleSubmit ? "Cita reservada" : "Reserva cita"}
      </h1>

      {/* Mensaje de error al registrar la cita */}
      {error && !loading && (
        <p className="relative mt-5 text-red-900 text-xl text-center font-bold">
          {error}
        </p>
      )}

      {/* Mensaje de confirmación de cita */}
      {mensaje && (
        <div className="w-full lg:w-xl bg-green-100 mb-6 relative flex flex-col gap-2 border border-green-700 text-green-800 p-4 rounded shadow-md">
          <h2 className="font-bold text-lg text-center mb-2">
            Cita reservada correctamente
          </h2>

          <p>
            <strong>Nombre y apellido/s:</strong> {mensaje.nombre}{" "}
            {mensaje.apellido}
          </p>
          <p>
            <strong>Teléfono:</strong> {mensaje.telefono}
          </p>
          <p>
            <strong>Servicio:</strong> {mensaje.servicio}
          </p>
          <p>
            <strong>Profesional:</strong> {mensaje.profesional}
          </p>
          <p>
            <strong>Día:</strong> {mensaje.fecha}
          </p>
          <p>
            <strong>Hora:</strong> {mensaje.hora}
          </p>
          <p>
            Para acceder a sus citas, haga click en{" "}
            <span className="font-bold underline underline-offset-2">
              <Link to="/mis-citas">Mis citas</Link>
            </span>{" "}
            e introduzca su número de teléfono para acceder de manera rápida o a
            través de su cuenta personal.
          </p>
        </div>
      )}

      {/* Formulario */}
      {!mensaje && (
        <div>
          <p className="relative pb-10 text-cyan-800 text-center text-lg font-medium">
            Para pedir cita, rellene todos los campos
          </p>

          <form
            onSubmit={manejarSubmit}
            className="w-[350px] lg:w-xl mx-auto relative flex flex-col justify-center lg:space-y-10"
          >
            <div className="w-full flex flex-col lg:flex-row justify-center gap-5 lg:gap-10">
              <div className="w-full flex flex-col gap-5">
                <label htmlFor="nombre" className="font-medium text-cyan-800">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={nombre}
                  placeholder="Introduce tu nombre"
                  minLength={3}
                  maxLength={40}
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+"
                  title="Escribe un mínimo de 3 letras hasta un máximo de 40"
                  required
                  onChange={(e) => {
                    setNombre(e.target.value);
                    setError(null);
                    setMensaje(null);
                  }}
                  autoComplete="given-name"
                  className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                />

                <label htmlFor="apellido" className="font-medium text-cyan-800">
                  Apellido/s
                </label>
                <input
                  id="apellido"
                  type="text"
                  name="apellido"
                  value={apellido}
                  placeholder="Introduce tu/s apellido/s"
                  required
                  minLength={3}
                  maxLength={40}
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+"
                  title="Escribe un mínimo de 3 letras hasta un máximo de 40"
                  onChange={(e) => {
                    setApellido(e.target.value);
                    setError(null);
                    setMensaje(null);
                  }}
                  autoComplete="family-name"
                  className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                />

                <label htmlFor="telefono" className="font-medium text-cyan-800">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    setError(null);
                    setMensaje(null);
                  }}
                  placeholder="Introduce tu teléfono móvil"
                  required
                  pattern="[0-9]{9}"
                  title="Escribe un teléfono de 9 dígitos"
                  autoComplete="tel"
                  className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                />
              </div>

              <div className="w-full flex flex-col gap-5">
                {/* Servicio */}
                <label htmlFor="servicio" className="font-medium text-cyan-800">
                  Servicio
                </label>
                <select
                  id="servicio"
                  className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                  required
                  value={servicio}
                  onChange={(e) => {
                    setServicio(e.target.value);
                    setError(null);
                    setMensaje(null);
                  }}
                >
                  <option value="">Selecciona un servicio</option>

                  {serviciosCita.map((servicio) => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.nombre}
                    </option>
                  ))}
                </select>

                {/* Profesional */}
                <label
                  htmlFor="profesional"
                  className="font-medium text-cyan-800"
                >
                  Profesional
                </label>
                <select
                  id="profesional"
                  className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                  required
                  value={profesional}
                  onChange={(e) => {
                    setProfesional(e.target.value);
                    setError(null);
                    setMensaje(null);
                  }}
                >
                  <option value="">Selecciona un profesional</option>

                  {profesionalesDisponibles.map((profesional) => (
                    <option key={profesional.id} value={profesional.id}>
                      {profesional.nombre}
                    </option>
                  ))}
                </select>

                {/* Calendario */}
                <label
                  htmlFor="fecha-hora"
                  className="font-medium text-cyan-800"
                >
                  Selecciona el día
                </label>
                <DatePicker
                  id="fecha-hora"
                  showIcon
                  selected={fecha}
                  onChange={(date) => {
                    setFecha(date);
                    setError(null);
                    setMensaje(null);
                  }}
                  minDate={new Date()}
                  dateFormat="Pp"
                  locale="es"
                  showTimeSelect
                  minTime={setHours(
                    setMinutes(new Date().setHours(0, 0, 0, 0), 0),
                    9,
                  )}
                  maxTime={setHours(
                    setMinutes(new Date().setHours(0, 0, 0, 0), 30),
                    19,
                  )}
                  timeIntervals={30}
                  timeFormat="HH:mm"
                  timeCaption="Hora"
                  filterTime={(time) => filtrarHorasPasadas(time, fecha)}
                  // 6 es sábado y 0 es domingo
                  filterDate={(date) =>
                    date.getDay() !== 6 && date.getDay() !== 0
                  }
                  className="w-full mb-10 py-1! pl-9! lg:mb-0 border-2 border-cyan-700 rounded-sm bg-white"
                />
              </div>
            </div>

            <input
              type="submit"
              value={loading ? "Reservando cita..." : "Confirmar cita"}
              disabled={loading}
              className={`w-40 mx-auto bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600 ${loading ? "bg-cyan-400 cursor-not-allowed" : ""}`}
            />
          </form>
        </div>
      )}
    </section>
  );
}

export default ReservarCita;
