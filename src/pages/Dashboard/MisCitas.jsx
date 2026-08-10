import { useEffect } from "react";
import { useReservationForm } from "@/hooks";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { profesionales, serviciosCita } from "@/data";
import { filterPastHours } from "@/utils";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function MisCitas() {
  const {
    nombre,
    setNombre,
    apellido,
    setApellido,
    telefono,
    setTelefono,
    servicio,
    setServicio,
    profesional,
    setProfesional,
    fecha,
    setFecha,
    loading,
    error,
    setError,
    mensaje,
    setMensaje,
    profesionalesDisponibles,
    manejarSubmit,
  } = useReservationForm({ servicios: serviciosCita, profesionales });

  useEffect(() => {
    console.log(
      "ReservarCita debug -> servicio:",
      servicio,
      "profesionalesDisponibles:",
      profesionalesDisponibles,
    );
  }, [servicio, profesionalesDisponibles]);

  return (
    <section className="w-full h-full p-3 lg:p-10 flex justify-center items-center">
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
        </div>
      )}

      {/* Formulario */}
      {!mensaje && (
        <div className="w-full lg:w-xl">
          <form
            onSubmit={manejarSubmit}
            className="w-full mx-auto relative p-6 rounded-md shadow-[0_0_5px_black] border border-slate-200 bg-white flex flex-col justify-center lg:space-y-10"
          >
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
                {servicio === "" ? (
                  <>
                    <option value="">Selecciona un profesional</option>
                    <option value="" disabled>
                      Selecciona un servicio primero
                    </option>
                  </>
                ) : profesionalesDisponibles.length === 0 ? (
                  <>
                    <option value="">Selecciona un profesional</option>
                    <option value="" disabled>
                      No hay profesionales disponibles
                    </option>
                  </>
                ) : (
                  <>
                    <option value="">Selecciona un profesional</option>
                    {profesionalesDisponibles.map((profesional) => (
                      <option key={profesional.id} value={profesional.id}>
                        {profesional.name || profesional.nombre || "Sin nombre"}
                      </option>
                    ))}
                  </>
                )}
              </select>

              {/* Calendario */}
              <label htmlFor="fecha-hora" className="font-medium text-cyan-800">
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
                filterTime={(time) => filterPastHours(time, fecha)}
                // 6 es sábado y 0 es domingo
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                className="w-full mb-10 py-1! pl-9! lg:mb-0 border-2 border-cyan-700 rounded-sm bg-white"
              />
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

export default MisCitas;
