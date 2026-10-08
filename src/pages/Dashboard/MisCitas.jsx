import { useContext, useEffect, useState } from "react";
import { useReservationForm } from "@/hooks";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { professionals, services } from "@/data";
import { isBookingTimeAllowed } from "@/utils";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { Button } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCalendarCheck,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function MisCitas() {
  const { user } = useContext(AuthContext);
  const [appointment, setAppointment] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [refreshAppointments, setRefreshAppointments] = useState(0);
  const [showFormAppointment, setShowFormAppointment] = useState(false);
  const [modalEditAppointment, setModalEditAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalEditDateAppointment, setModalEditDateAppointment] = useState();
  const [removeAppointmentModal, setRemoveAppointmentModal] = useState(null);

  const {
    service,
    setService,
    professional,
    setProfessional,
    selectedDate,
    setSelectedDate,
    loading,
    setLoading,
    error,
    setError,
    message,
    setMessage,
    availableProfessionals,
    handleSubmit,
  } = useReservationForm({
    services,
    professionals,
    userId: user?.uid,
    onReservationCreated: () => {
      setRefreshAppointments((current) => current + 1);
      setShowFormAppointment(false);
      setModalEditAppointment(false);
    },
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

  // Función para mostrar el formulario
  function handleForm() {
    setShowFormAppointment(true);
    setModalEditAppointment(false);
    setMessage(null);
    setError(null);
  }

  // Función para mostrar la tabla de citas, después de haber reservado cita
  function handleViewAppointments() {
    setMessage(null);
  }

  // Función para gestionar la cita (se abre un modal)
  function handleEditAppointment(appointment) {
    setSelectedAppointment(appointment);
    setModalEditAppointment(true);
    setMessage(null);
    setError(null);
  }

  // Modal para modificar fecha de la cita
  function handleEditDateAppointment() {
    setModalEditDateAppointment(true);
    setModalEditAppointment(false);
    setMessage(null);
    setError(null);
  }

  // Para guardar la nueva fecha de la cita
  const savedChanges = async () => {
    if (!selectedAppointment?.id) {
      setError("No se encontró la cita que quieres modificar");
    }

    if (!selectedDate) {
      setError("Debes seleccionar una fecha y una hora");
      return;
    }

    // Para desactivar el botón Guardar mientras se actualiza la lista de citas
    setLoading(true);
    setError(null);

    try {
      await updateDoc(doc(db, "citas", selectedAppointment.id), {
        date: Timestamp.fromDate(selectedDate),
        hour: selectedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });

      // Refrescar citas
      setRefreshAppointments((current) => current + 1);

      setModalEditDateAppointment(false);
      setModalEditAppointment(false);
      setSelectedAppointment(null);
      setSelectedDate(null);
      setMessage(null);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un problema al actualizar la cita");
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar la cita
  const removeAppointment = async (id) => {
    if (!id) {
      setError("No se encontró la cita que quieres cancelar");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteDoc(doc(db, "citas", id));

      // Actualizar la lista mostrada
      setAppointment((currentAppointments) =>
        currentAppointments.filter((item) => item.id !== id),
      );

      return true;
    } catch (err) {
      console.error(err);
      setError("Ocurrió un problema al eliminar la cita");
      return false;
    } finally {
      setLoading(false);
    }
  };

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

      {/* Si no hay citas y no está abierto el formulario, mostrar mensaje */}
      {!showFormAppointment && appointment.length === 0 && (
        <div className="w-full sm:w-lg lg:w-xl bg-green-100 lg:mb-6 relative flex flex-col items-center gap-4 border border-green-700 text-green-800 text-center p-4 rounded shadow-md">
          <h2 className="font-bold text-lg text-center mb-2">
            No tienes citas
          </h2>
          <p>Solicita una cita para verla aquí.</p>
          <Button onClick={handleForm} icon={faCalendarDays} className="w-40">
            Reserva cita
          </Button>
        </div>
      )}

      {/* Tabla para ordenador SI hay citas*/}
      {!appointmentsLoading &&
        !appointmentsError &&
        !showFormAppointment &&
        !message &&
        appointment.length > 0 && (
          <div className="w-full overflow-auto hidden lg:block text-center">
            <table className="w-3xl mx-auto pt-10 flex flex-col justify-start gap-1">
              <thead>
                <tr className="p-3 flex justify-around justify-items-center items-center gap-3 text-cyan-800 border-2 border-cyan-700 rounded-sm shadow-[0_0_5px] shadow-cyan-700">
                  <th className="w-30">Fecha</th>
                  <th className="w-30">Hora</th>
                  <th className="w-30">Tratamiento</th>
                  <th className="w-30">Profesional</th>
                  <th className="w-30">Estado</th>
                  <th className="w-30">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {appointment.map((appointment, id) => (
                  <tr
                    key={appointment.id}
                    className={`${id % 2 === 0 ? "bg-white" : "bg-cyan-50"} p-3 flex justify-around justify-items-center items-center gap-3 border-b-2 border-b-cyan-600`}
                  >
                    <td className="w-30">
                      {appointment.date?.toLocaleDateString("es-ES")}
                    </td>
                    <td className="w-30">{appointment.hour}</td>
                    <td className="w-30">{appointment.service}</td>
                    <td className="w-30">{appointment.professional}</td>
                    <td className="w-30">
                      <span
                        className="p-1 rounded-sm border-2 font-semibold bg-yellow-300 border-yellow-500 text-yellow-800"
                      >
                        {appointment.state}
                      </span>
                    </td>
                    <td className="w-30">
                      <button
                        onClick={() => handleEditAppointment(appointment)}
                        className="p-2 cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-cyan-700 mr-2"
                        />
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button
              onClick={handleForm}
              icon={faCalendarDays}
              className="w-40 my-5"
            >
              Reserva cita
            </Button>
          </div>
        )}

      {/* Tabla para móvil SI hay citas*/}
      {!appointmentsLoading &&
        !appointmentsError &&
        !showFormAppointment &&
        !message &&
        appointment.length > 0 && (
          <div className="w-full py-5 flex flex-col gap-5 justify-center items-center lg:hidden">
            {appointment.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 flex flex-col justify-start gap-2 rounded-sm border-2 border-cyan-700 shadow-[0_0_5px] shadow-cyan-700 bg-white"
              >
                <p>
                  <span className="font-bold text-cyan-700">Fecha:</span>{" "}
                  {appointment.date?.toLocaleDateString("es-ES")}
                </p>
                <p>
                  <span className="font-bold text-cyan-700">Hora:</span>{" "}
                  {appointment.hour}
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
                  <span
                    className="p-1 rounded-sm border-2 font-semibold bg-yellow-300 border-yellow-500 text-yellow-800"
                  >
                    {appointment.state}
                  </span>
                </p>
                <p>
                  <span className="font-bold text-cyan-700">Acciones:</span>{" "}
                  <button
                    onClick={() => handleEditAppointment(appointment)}
                    className="p-2 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-cyan-700 mr-2"
                    />
                    Gestionar
                  </button>
                </p>
              </div>
            ))}

            <Button onClick={handleForm} icon={faCalendarDays} className="w-40">
              Reserva cita
            </Button>
          </div>
        )}

      {/* Formulario */}
      {showFormAppointment && (
        <div className="w-full lg:w-xl">
          <form
            onSubmit={handleSubmit}
            className="w-full mx-auto relative p-6 rounded-md shadow-[0_0_5px_black] border border-slate-200 bg-white flex flex-col justify-center gap-6 lg:space-y-10"
          >
            <div className="w-full flex flex-col gap-5 lg:mb-0">
              {/* Calendario */}
              <label htmlFor="date" className="font-medium text-cyan-800">
                Selecciona el día
              </label>
              <DatePicker
                id="date"
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
                // Se filtra el tiempo para que la cita sea con 2 horas de antelación a la hora actual
                filterTime={(time) => isBookingTimeAllowed(time)}
                // 6 es sábado y 0 es domingo
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                className="w-full py-1! pl-9! border-2 border-cyan-700 rounded-sm bg-white"
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
        <p className="relative my-5 text-red-900 text-xl text-center font-bold">
          {error}
        </p>
      )}

      {/* Mensaje de confirmación de cita */}
      {message && (
        <div className="w-full lg:w-xl bg-green-100 my-6 relative flex flex-col gap-2 border border-green-700 text-green-800 p-4 rounded shadow-md">
          <h2 className="font-bold text-lg text-center mb-2">
            ¡Cita reservada!
          </h2>
          <p>Tu cita ha sido registrada correctamente.</p>
          <p>
            <strong>Fecha:</strong> {message.date}
          </p>
          <p>
            <strong>Hora:</strong> {message.hour}
          </p>
          <p>
            <strong>Tratamiento:</strong> {message.service}
          </p>
          <p>
            <strong>Profesional:</strong> {message.professional}
          </p>
          <Button
            onClick={handleViewAppointments}
            icon={faCalendarCheck}
            className="w-40 mx-auto my-2"
          >
            Ver mis citas
          </Button>
        </div>
      )}

      {/* Modal para gestionar la cita */}
      {modalEditAppointment && selectedAppointment && (
        <div className="fixed inset-0 bg-cyan-900/80 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative flex flex-col justify-center gap-4 text-cyan-900"
            id="dialog_eliminar_cita"
            role="dialog"
            aria-labelledby="dialog_eliminar_cita_label"
            aria-modal="true"
          >
            <h3
              id="dialog_modificar_cita_label"
              className="text-xl font-bold mb-4 text-cyan-800 text-center"
            >
              Gestionar cita
            </h3>
            <p>
              <strong className="text-cyan-700">Fecha:</strong>{" "}
              {selectedAppointment.date?.toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong className="text-cyan-700">Hora:</strong>{" "}
              {selectedAppointment.hour}
            </p>
            <p>
              <strong className="text-cyan-700">Tratamiento:</strong>{" "}
              {selectedAppointment.service}
            </p>
            <p>
              <strong className="text-cyan-700">Profesional:</strong>{" "}
              {selectedAppointment.professional}
            </p>
            <div className="inline-flex gap-10 mx-auto mt-4">
              <Button onClick={handleEditDateAppointment}>
                Modificar fecha
              </Button>
              <Button
                deleteButton
                onClick={() => {
                  setRemoveAppointmentModal(selectedAppointment);
                  setMessage(null);
                  setError(null);
                }}
                aria-label="Cancelar cita"
              >
                Cancelar cita
              </Button>
            </div>
            {/* Botón para cerrar el modal */}
            <Button
              deleteButton
              onClick={() => {
                (setModalEditAppointment(null), setSelectedAppointment(null));
              }}
              aria-label="Cerrar modal"
              className="absolute right-2 top-2 h-10 w-10"
              icon={faXmark}
            ></Button>
          </div>
        </div>
      )}

      {/* Modal para modificar la fecha de la cita */}
      {modalEditDateAppointment && (
        <div className="fixed inset-0 bg-cyan-900/80 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative flex flex-col justify-center items-center gap-2"
            id="dialog_modificar_cita"
            role="dialog"
            aria-labelledby="dialog_modificar_cita_label"
            aria-modal="true"
          >
            <h3
              id="dialog_modificar_cita_label"
              className="text-xl font-bold mb-4 text-cyan-800"
            >
              Editar fecha
            </h3>

            <form>
              <label
                htmlFor="new-date"
                className="font-medium text-cyan-800 mr-2"
              >
                Selecciona el día
              </label>
              <DatePicker
                id="date"
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
                // Se filtra el tiempo para que la cita sea con 2 horas de antelación a la hora actual
                filterTime={(time) => isBookingTimeAllowed(time)}
                // 6 es sábado y 0 es domingo
                filterDate={(date) =>
                  date.getDay() !== 6 && date.getDay() !== 0
                }
                className="w-full py-1! pl-9! border-2 border-cyan-700 rounded-sm bg-white"
              />

              <div className="mt-5 flex justify-center items-center gap-4">
                <Button
                  onClick={savedChanges}
                  disabled={loading}
                  aria-label={loading ? "Guardando..." : "Guardar"}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 focus:ring-green-700 cursor-pointer"
                >
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
                <Button
                  onClick={() => setModalEditDateAppointment(null)}
                  disabled={loading}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-500 focus:ring-gray-600 cursor-pointer"
                >
                  {loading ? "Cancelando..." : "Cancelar"}
                </Button>
              </div>
            </form>

            {/* Botón para cerrar el modal */}
            <Button
              deleteButton
              onClick={() => setModalEditDateAppointment(null)}
              aria-label="Cerrar modal"
              className="absolute right-2 top-2 h-10 w-10"
              icon={faXmark}
            ></Button>
          </div>
        </div>
      )}

      {/* Modal para eliminar cita/s */}

      {removeAppointmentModal && (
        <div className="fixed inset-0 bg-cyan-900/10 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative flex flex-col justify-center gap-4 text-cyan-900"
            id="dialog_eliminar_cita"
            role="dialog"
            aria-labelledby="dialog_eliminar_cita_label"
            aria-modal="true"
          >
            <h3
              id="dialog_eliminar_cita_label"
              className="text-xl font-bold mb-4 text-cyan-800"
            >
              ¿Seguro que quieres cancelar la cita?
            </h3>
            <p>
              <strong className="text-cyan-700">Fecha:</strong>{" "}
              {selectedAppointment.date?.toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong className="text-cyan-700">Hora:</strong>{" "}
              {selectedAppointment.hour}
            </p>
            <p>
              <strong className="text-cyan-700">Tratamiento:</strong>{" "}
              {selectedAppointment.service}
            </p>
            <p>
              <strong className="text-cyan-700">Profesional:</strong>{" "}
              {selectedAppointment.professional}
            </p>

            <div className="mt-5 flex justify-center items-center gap-4">
              <Button
                deleteButton
                onClick={async () => {
                  const deleted = await removeAppointment(
                    removeAppointmentModal.id,
                  );

                  if (deleted) {
                    setRemoveAppointmentModal(null);
                    setModalEditAppointment(false);
                    setSelectedAppointment(null);
                  }
                }}
                disabled={loading}
                aria-label={loading ? "Cancelando cita..." : "Cancelar cita"}
              >
                {loading ? "Cancelando cita..." : "Cancelar cita"}
              </Button>

              <Button
                onClick={() => {
                  (setRemoveAppointmentModal(null),
                    setModalEditAppointment(null));
                }}
                aria-label="Volver"
                className="bg-slate-500 text-slate-700 cursor-not-allowed focus-visible:ring-slate-950 hover:bg-slate-400"
              >
                Volver
              </Button>
            </div>

            {/* Botón para cerrar el modal */}
            <Button
              deleteButton
              onClick={() => {
                (setRemoveAppointmentModal(null),
                  setModalEditAppointment(null));
              }}
              aria-label="Cerrar modal"
              className="absolute right-2 top-2 h-10 w-10"
              icon={faXmark}
            ></Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default MisCitas;
