import { useEffect } from "react";
import { useReservationForm } from "@/hooks";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { professionals, services } from "@/data";
import { filterPastHours } from "@/utils";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function MisCitas() {
  const {
    name,
    setName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    service,
    setService,
    professional,
    setProfessional,
    selectedDate,
    setSelectedDate,
    loading,
    error,
    setError,
    message,
    setMessage,
    availableProfessionals,
    manejarSubmit,
  } = useReservationForm({ services: services, professionals });

  useEffect(() => {
    console.log(
      "ReservarCita debug -> servicio:",
      service,
      "profesionalesDisponibles:",
      availableProfessionals,
    );
  }, [service, availableProfessionals]);

  return (
    <section className="w-full h-full p-3 lg:p-10 flex justify-center items-center">
      {/* Mensaje de error al registrar la cita */}
      {error && !loading && (
        <p className="relative mt-5 text-red-900 text-xl text-center font-bold">
          {error}
        </p>
      )}

      {/* Mensaje de confirmación de cita */}
      {message && (
        <div className="w-full lg:w-xl bg-green-100 mb-6 relative flex flex-col gap-2 border border-green-700 text-green-800 p-4 rounded shadow-md">
          <h2 className="font-bold text-lg text-center mb-2">
            Cita reservada correctamente
          </h2>

          <p>
            <strong>Nombre y apellido/s:</strong> {message.name}{" "}
            {message.lastName}
          </p>
          <p>
            <strong>Teléfono:</strong> {message.phoneNumber}
          </p>
          <p>
            <strong>Servicio:</strong> {message.service}
          </p>
          <p>
            <strong>Profesional:</strong> {message.professional}
          </p>
          <p>
            <strong>Día:</strong> {message.selectedDate}
          </p>
          <p>
            <strong>Hora:</strong> {message.hora}
          </p>
        </div>
      )}

      {/* Formulario */}
      {!message && (
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
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setError(null);
                  setMessage(null);
                }}
              >
                <option value="">Selecciona un servicio</option>

                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
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
                value={professional}
                onChange={(e) => {
                  setProfessional(e.target.value);
                  setError(null);
                  setMessage(null);
                }}
              >
                {service === "" ? (
                  <>
                    <option value="">Selecciona un profesional</option>
                    <option value="" disabled>
                      Selecciona un servicio primero
                    </option>
                  </>
                ) : availableProfessionals.length === 0 ? (
                  <>
                    <option value="">Selecciona un profesional</option>
                    <option value="" disabled>
                      No hay profesionales disponibles
                    </option>
                  </>
                ) : (
                  <>
                    <option value="">Selecciona un profesional</option>
                    {availableProfessionals.map((professional) => (
                      <option key={professional.id} value={professional.id}>
                        {professional.name ?? "Sin nombre"}
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
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setError(null);
                  setMessage(null);
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
                  setMinutes(new Date().setHours(0, 0, 0, 0), 0),
                  19,
                )}
                timeIntervals={60}
                timeFormat="HH:mm"
                timeCaption="Hora"
                filterTime={(time) => filterPastHours(time, selectedDate)}
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
