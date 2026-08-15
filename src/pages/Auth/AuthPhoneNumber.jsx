import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { validatePhone } from "@/utils/validatePhone";
import { filterPastHours } from "@/utils/filterPastHours";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { DecorativeShape, Button } from "@/components";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function AuthPhoneNumber() {
  const [phoneNumberSearch, setPhoneNumberSearch] = useState("");
  const [patientAppointment, setPatientAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [removeAppointmentModal, setRemoveAppointmentModal] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState();

  async function getAppointmentWithPhoneNumber(phoneNumber) {
    const q = query(collection(db, "citas"), where("phoneNumber", "==", phoneNumber));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convierte Timestamp a Date
          selectedDate:
            data.selectedDate && data.selectedDate.toDate ? data.selectedDate.toDate() : data.selectedDate,
        };
      })
      .sort((a, b) => new Date(a.selectedDate) - new Date(b.selectedDate));
  }

  const searchAppointment = async (e) => {
    e.preventDefault();

    // Validación del teléfono
    if (!validatePhone(phoneNumberSearch)) {
      setMessage("El teléfono introducido debe tener 9 dígitos");
      setPatientAppointment([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);
    setPatientAppointment([]);

    try {
      const filterAppointment = await getAppointmentWithPhoneNumber(phoneNumberSearch);

      //Si no existen citas guardadas con el teléfono (empty state)

      if (filterAppointment.length === 0) {
        setMessage(
          "No hemos encontrado citas asociadas a este número de teléfono. Comprueba que el número sea correcto.",
        );
        return;
      }

      setPatientAppointment(filterAppointment);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un problema al obtener las citas");
    } finally {
      setLoading(false);
    }
  };

  const removeAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, "citas", id));

      // Actualizar la lista mostrada
      const newAppointment = patientAppointment.filter(
        (appointment) => appointment.id !== id,
      );

      setPatientAppointment(newAppointment);

      // Si ya no quedan citas para ese teléfono
      if (newAppointment.length === 0) {
        setMessage("Has eliminado todas tus citas");
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un problema al eliminar la cita");
    }
  };

  const savedChanges = async () => {
    if (!selectedDate) {
      setError("Debes seleccionar una fecha y una hora");
      return;
    }

    // Para desactivar el botón Guardar mientras se actualiza la lista de citas
    setLoading(true);

    try {
      await updateDoc(doc(db, "citas", editAppointment.id), {
        selectedDate: Timestamp.fromDate(selectedDate),
        hour: selectedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Refrescar citas

      const updatedAppointment = await getAppointmentWithPhoneNumber(phoneNumberSearch);

      setPatientAppointment(updatedAppointment);
      setEditAppointment(null);
      setMessage("Cita actualizada correctamente");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un problema al actualizar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center gap-10 overflow-hidden bg-cyan-50">
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

      <h1 className="py-10 relative text-cyan-800 text-center text-4xl font-bold">
        Acceso rápido
      </h1>

      <div className="max-w-3xl mx-auto p-6 relative rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white flex flex-col justify-center items-center gap-10">
        {/* Formulario búsqueda de cita */}
        <form
          onSubmit={searchAppointment}
          className="w-60 lg:w-96 flex flex-col gap-10 justify-center items-center"
        >
          <label
            htmlFor="phoneNumberSearch"
            className="text-lg font-semibold text-cyan-800"
          >
            Introduce tu teléfono móvil:
          </label>
          <input
            id="phoneNumberSearch"
            type="tel"
            name="phoneNumberSearch"
            value={phoneNumberSearch}
            onChange={(e) => setPhoneNumberSearch(e.target.value)}
            placeholder="Ej: 123456789"
            required
            pattern="[0-9]{9}"
            title="Escribe un teléfono de 9 dígitos"
            className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
          />

          <input
            type="submit"
            value={loading ? "Buscando..." : "Buscar cita"}
            disabled={loading}
            aria-label={loading ? "Buscando..." : "Buscar cita"}
            className={`w-40 mx-auto p-3 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in 
            ${loading ? " bg-cyan-400 cursor-not-allowed" : "bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600"}`}
          />
        </form>

        {/* Mensaje de loading */}
        {loading && (
          <p className="text-cyan-800 text-xl text-center font-bold">
            Buscando citas...
          </p>
        )}

        {/* Mensaje de error */}
        {error && !loading && (
          <p className="text-cyan-800 text-xl text-center font-bold">{error}</p>
        )}

        {/* Mensaje */}
        {message && !loading && !error && (
          <p className="text-cyan-800 text-xl text-center font-bold">
            {message}
          </p>
        )}

        {/* Lista de citas (success state) */}

        {patientAppointment.length > 0 && (
          <div className="w-86 lg:w-xl flex flex-col gap-6">
            {patientAppointment.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white text-cyan-700 border-2 border-cyan-700 rounded p-4 shadow"
              >
                <p className="wrap-anywhere">
                  <strong>Nombre y apellido/s:</strong> {appointment.name}{" "}
                  {appointment.lastName}
                </p>
                <p>
                  <strong>Teléfono:</strong> {appointment.phoneNumber}
                </p>
                <p>
                  <strong>Servicio:</strong> {appointment.service}
                </p>
                <p>
                  <strong>Profesional:</strong> {appointment.profesional}
                </p>
                <p>
                  <strong>Día:</strong>{" "}
                  {new Date(appointment.selectedDate).toLocaleDateString("es-ES")}
                </p>
                <p>
                  <strong>Hora:</strong> {appointment.hour}
                </p>

                <div className="flex flex-row gap-5">
                  <Button
                    onClick={() => {
                      setRemoveAppointmentModal(appointment);
                      setMessage(null);
                      setError(null);
                    }}
                    aria-label="Eliminar cita"
                    className="mt-3 bg-red-700 text-white p-2 rounded shadow shadow-red-950 hover:bg-red-600 focus:ring-red-900 transition-colors duration-200 ease-in cursor-pointer"
                  >
                    Eliminar cita
                  </Button>

                  <Button
                    onClick={() => {
                      setEditAppointment(appointment);
                      setSelectedDate(
                        appointment.selectedDate instanceof Date
                          ? appointment.selectedDate
                          : appointment.selectedDate.toDate(),
                      );
                      setMessage(null);
                      setError(null);
                    }}
                    aria-label="Modificar cita"
                    className="mt-3 bg-green-700 text-white p-2 rounded shadow shadow-green-950 hover:bg-green-600 focus:ring-green-700 transition-colors duration-200 ease-in cursor-pointer"
                  >
                    Modificar cita
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal para eliminar cita/s */}

        {removeAppointmentModal && (
          <div className="fixed inset-0 bg-cyan-900/80 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative flex flex-col justify-center items-center gap-2"
              id="dialog_eliminar_cita"
              role="dialog"
              aria-labelledby="dialog_eliminar_cita_label"
              aria-modal="true"
            >
              <h3
                id="dialog_eliminar_cita_label"
                className="text-xl font-bold mb-4 text-cyan-800"
              >
                ¿Seguro que quieres eliminar la cita?
              </h3>

              <div className="mb-4 text-cyan-700">
                <p>
                  <strong>Nombre:</strong> {removeAppointmentModal.name}{" "}
                  {removeAppointmentModal.lastName}
                </p>
                <p>
                  <strong>Servicio:</strong> {removeAppointmentModal.service}
                </p>
                <p>
                  <strong>Día:</strong>{" "}
                  {new Date(removeAppointmentModal.selectedDate).toLocaleDateString(
                    "es-ES",
                  )}
                </p>
                <p>
                  <strong>Hora:</strong> {removeAppointmentModal.hour}
                </p>
              </div>

              <div className="mt-5 flex justify-center items-center gap-4">
                <Button
                  className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 focus:ring-red-900 cursor-pointer"
                  onClick={async () => {
                    await removeAppointment(removeAppointmentModal.id);
                    setRemoveAppointmentModal(null);
                  }}
                  disabled={loading}
                  aria-label={loading ? "Eliminando..." : "Eliminar"}
                >
                  {loading ? "Eliminando..." : "Eliminar"}
                </Button>

                <Button
                  onClick={() => setRemoveAppointmentModal(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-500 focus:ring-gray-600 cursor-pointer"
                >
                  Cancelar
                </Button>
              </div>

              {/* Botón para cerrar el modal */}
              <Button
                onClick={() => setRemoveAppointmentModal(null)}
                aria-label="Cerrar modal"
                className="w-5 h-5 absolute top-2 right-2 bg-red-800 text-2xl cursor-pointer hover:bg-red-900 focus:ring-red-900"
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Modal para editar cita/s */}

        {editAppointment && (
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
                Editar cita
              </h3>

              <form>
                <label
                  htmlFor="new-date"
                  className="font-medium text-cyan-800 mr-2"
                >
                  Selecciona el día
                </label>
                <DatePicker
                  id="new-date"
                  showIcon
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
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
                    onClick={() => setEditAppointment(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-500 focus:ring-gray-600 cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>

              {/* Botón para cerrar el modal */}
              <Button
                onClick={() => setEditAppointment(null)}
                aria-label="Cerrar modal"
                className="w-5 h-5 absolute top-2 right-2 bg-red-800 text-2xl cursor-pointer hover:bg-red-900 focus:ring-red-900"
              >
                ×
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AuthPhoneNumber;
