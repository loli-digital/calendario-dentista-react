import { useContext, useEffect, useState } from "react";
import { useReservationForm } from "@/hooks";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { professionals, services } from "@/data";
import { filterPastHours } from "@/utils";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button } from "@/components";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function MisCitas() {
  const { user } = useContext(AuthContext);
  const [appointment, setAppointment] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [refreshAppointments, setRefreshAppointments] = useState(0);
  const [showFormAppointment, setShowFormAppointment] = useState(false);

  const {
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
  } = useReservationForm({
    services,
    professionals,
    userId: user?.uid,
    onReservationCreated: () =>
      setRefreshAppointments((current) => current + 1),
  });

  useEffect(() => {
    if (!user?.uid) {
      setAppointment([]);
      setAppointmentsLoading(false);
      return;
    }

    let isCurrent = true;

    async function loadAppointments() {
      setAppointmentsLoading(true);
      setAppointmentsError(null);

      try {
        const appointmentsQuery = query(
          collection(db, "citas"),
          where("userId", "==", user.uid),
        );
        const snapshot = await getDocs(appointmentsQuery);
        const userAppointments = snapshot.docs
          .map((appointmentDoc) => {
            const data = appointmentDoc.data();
            return {
              id: appointmentDoc.id,
              ...data,
              date: data.date?.toDate
                ? data.date.toDate()
                : new Date(data.date),
            };
          })
          .sort((first, second) => first.date - second.date);

        if (isCurrent) setAppointment(userAppointments);
      } catch (error) {
        console.error(error);
        if (isCurrent) {
          setAppointmentsError("No se pudieron cargar tus citas.");
        }
      } finally {
        if (isCurrent) setAppointmentsLoading(false);
      }
    }

    loadAppointments();
    return () => {
      isCurrent = false;
    };
  }, [user?.uid, refreshAppointments]);

  function handleForm() {
    setShowFormAppointment(true);
  }

  return (
    <section className="w-full h-full p-3 lg:p-10 flex flex-col justify-center items-center">
      {appointmentsLoading && (
        <p role="status" className="py-6 text-center">
          Cargando tus citas...
        </p>
      )}

      {appointmentsError && (
        <p role="alert" className="py-6 text-center text-red-900">
          {appointmentsError}
        </p>
      )}

      {appointment.length === 0 ? (
        !showFormAppointment && (
          <div className="w-full sm:w-lg lg:w-xl bg-green-100 mb-6 relative flex flex-col items-center gap-4 border border-green-700 text-green-800 text-center p-4 rounded shadow-md">
            <h2 className="font-bold text-lg text-center mb-2">
              No tienes citas
            </h2>
            <p>Solicita una cita para verla aquí.</p>
            <Button onClick={handleForm} icon={faCalendarDays} className="w-40">
              Reserva cita
            </Button>
          </div>
        )
      ) : (
        <div className="w-full overflow-auto hidden sm:block text-center">
          {/* Tabla para ordenador */}
          <table className="w-3xl mx-auto pt-10 flex flex-col justify-start gap-1">
            <thead>
              <tr className="p-3 flex justify-around justify-items-center items-center gap-3 text-cyan-800 border-2 border-cyan-700 rounded-sm shadow-[0_0_5px] shadow-cyan-700">
                <th className="w-30">Fecha</th>
                <th className="w-30">Hora</th>
                <th className="w-30">Tratamiento</th>
                <th className="w-30">Profesional</th>
                <th className="w-30">Estado</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((appointment, id) => (
                <tr
                  key={appointment.id}
                  className={`${id % 2 === 0 ? "bg-white" : "bg-cyan-50"} p-3 flex justify-around justify-items-center items-center gap-3 border-b-2 border-b-cyan-600`}
                >
                  <td className="w-30">{appointment.date}</td>
                  <td className="w-30">{appointment.hour}</td>
                  <td className="w-30">{appointment.service}</td>
                  <td className="w-30">{appointment.professional}</td>
                  <td className="w-30">{appointment.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabla para móvil */}
      {!appointmentsLoading && !appointmentsError && appointment.length > 0 && (
        <div className="w-full flex flex-col gap-5 sm:hidden">
          {appointment.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 flex flex-col justify-start gap-2 rounded-sm border-2 border-cyan-700 shadow-[0_0_5px] shadow-cyan-700 bg-white"
            >
              <p>
                <span className="font-bold text-cyan-700">Fecha:</span>{" "}
                {appointment.date.toLocaleDateString("es-ES")}
              </p>
              <p>
                <span className="font-bold text-cyan-700">Hora:</span>{" "}
                {appointment.hora}
              </p>
              <p>
                <span className="font-bold text-cyan-700">Tratamiento:</span>{" "}
                {appointment.service}
              </p>
              <p>
                <span className="font-bold text-cyan-700">Profesional:</span>{" "}
                {appointment.professional}
              </p>
              <p>
                <span className="font-bold text-cyan-700">Estado:</span>{" "}
                {appointment.state ?? "Pendiente"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Formulario */}
      {showFormAppointment && (
        <div className="w-full lg:w-xl">
          <form
            onSubmit={manejarSubmit}
            className="w-full mx-auto relative p-6 rounded-md shadow-[0_0_5px_black] border border-slate-200 bg-white flex flex-col justify-center lg:space-y-10"
          >
            <div className="w-full flex flex-col gap-5">
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

              {/* Tratamiento */}
              <label
                htmlFor="tratamiento"
                className="font-medium text-cyan-800"
              >
                Tratamiento
              </label>
              <select
                id="tratamiento"
                className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
                required
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setError(null);
                  setMessage(null);
                }}
              >
                <option value="">Selecciona un tratamiento</option>

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
                      Selecciona un tratamiento primero
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
            </div>

            <input
              type="submit"
              value={loading ? "Reservando cita..." : "Reservar cita"}
              disabled={loading}
              className={`w-40 mx-auto bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600 ${loading ? "bg-cyan-400 cursor-not-allowed" : ""}`}
            />
          </form>
        </div>
      )}

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
            ¡Cita reservada!
          </h2>
          <p>Hola, {message.name}. Tu cita ha sido registrada correctamente.</p>
          <p>
            <strong>Fecha:</strong> {message.date}
          </p>
          <p>
            <strong>Hora:</strong> {message.hora}
          </p>
          <p>
            <strong>Tratamiento:</strong> {message.service}
          </p>
          <p>
            <strong>Profesional:</strong> {message.professional}
          </p>
        </div>
      )}
    </section>
  );
}

export default MisCitas;
