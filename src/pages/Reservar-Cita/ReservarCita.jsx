import { useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "@/App.css";
import { professionals, services } from "@/data";
import { filterPastHours } from "@/utils";
import { useReservationForm } from "@/hooks/useReservationForm";
import { Link } from "react-router-dom";
import { DecorativeShape } from "@/components";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function ReservarCita() {
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
    titleSubmit,
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
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center overflow-hidden bg-cyan-50">
      
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

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
      {!message && (
        <div>
          <p className="relative pb-10 text-cyan-800 text-center text-lg font-medium">
            Para pedir cita, rellene todos los campos
          </p>

          <form
            onSubmit={manejarSubmit}
            className="w-[350px] lg:w-xl mx-auto relative p-6 rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white flex flex-col justify-center lg:space-y-10"
          >
            <div className="w-full flex flex-col lg:flex-row justify-center gap-5 lg:gap-10">
              <div className="w-full flex flex-col gap-5">
                <label htmlFor="name" className="font-medium text-cyan-800">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Introduce tu nombre"
                  minLength={3}
                  maxLength={40}
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+"
                  title="Escribe un mínimo de 3 letras hasta un máximo de 40"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                    setMessage(null);
                  }}
                  autoComplete="given-name"
                  className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                />

                <label htmlFor="lastName" className="font-medium text-cyan-800">
                  Apellido/s
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={lastName}
                  placeholder="Introduce tu/s apellido/s"
                  required
                  minLength={3}
                  maxLength={40}
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+"
                  title="Escribe un mínimo de 3 letras hasta un máximo de 40"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError(null);
                    setMessage(null);
                  }}
                  autoComplete="family-name"
                  className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                />

                <label htmlFor="phoneNumber" className="font-medium text-cyan-800">
                  Teléfono
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError(null);
                    setMessage(null);
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
                <label htmlFor="service" className="font-medium text-cyan-800">
                  Servicio
                </label>
                <select
                  id="service"
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
                  htmlFor="professional"
                  className="font-medium text-cyan-800"
                >
                  Profesional
                </label>
                <select
                  id="professional"
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
                          {professional.name || professional.name || "Sin nombre"}
                        </option>
                      ))}
                    </>
                  )}
                </select>

                {/* Calendario */}
                <label
                  htmlFor="date-hour"
                  className="font-medium text-cyan-800"
                >
                  Selecciona el día
                </label>
                <DatePicker
                  id="date-hour"
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
                    setMinutes(new Date().setHours(0, 0, 0, 0), 30),
                    19,
                  )}
                  timeIntervals={30}
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
