import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { validarTelefono } from "@/utils/validarTelefono";
import { filtrarHorasPasadas } from "@/utils/filtrarHorasPasadas";
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
import { DecorativeShape } from "@/components";

// Registra el locale 'es' para el calendario en España
registerLocale("es", es);

function AuthTelefono() {
  const [telefonoBusqueda, setTelefonoBusqueda] = useState("");
  const [citasPaciente, setCitasPaciente] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [eliminarCitaModal, setEliminarCitaModal] = useState(null);
  const [citaAEditar, setCitaAEditar] = useState(null);
  const [fecha, setFecha] = useState();

  async function obtenerCitasPorTelefono(telefono) {
    const q = query(collection(db, "citas"), where("telefono", "==", telefono));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convierte Timestamp a Date
          fecha:
            data.fecha && data.fecha.toDate ? data.fecha.toDate() : data.fecha,
        };
      })
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }

  const buscarCitas = async (e) => {
    e.preventDefault();

    // Validación del teléfono
    if (!validarTelefono(telefonoBusqueda)) {
      setMensaje("El teléfono introducido debe tener 9 dígitos");
      setCitasPaciente([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setMensaje(null);
    setCitasPaciente([]);

    try {
      const citasFiltradas = await obtenerCitasPorTelefono(telefonoBusqueda);

      //Si no existen citas guardadas con el teléfono (empty state)

      if (citasFiltradas.length === 0) {
        setMensaje(
          "No hemos encontrado citas asociadas a este número de teléfono. Comprueba que el número sea correcto.",
        );
        return;
      }

      setCitasPaciente(citasFiltradas);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un problema al obtener las citas");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCita = async (id) => {
    try {
      await deleteDoc(doc(db, "citas", id));

      // Actualizar la lista mostrada
      const nuevasCitasPaciente = citasPaciente.filter(
        (cita) => cita.id !== id,
      );

      setCitasPaciente(nuevasCitasPaciente);

      // Si ya no quedan citas para ese teléfono
      if (nuevasCitasPaciente.length === 0) {
        setMensaje("Has eliminado todas tus citas");
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un problema al eliminar la cita");
    }
  };

  const guardarCambios = async () => {
    if (!fecha) {
      setError("Debes seleccionar una fecha y una hora");
      return;
    }

    // Para desactivar el botón Guardar mientras se actualiza la lista de citas
    setLoading(true);

    try {
      await updateDoc(doc(db, "citas", citaAEditar.id), {
        fecha: Timestamp.fromDate(fecha),
        hora: fecha.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Refrescar citas

      const citasActualizadas = await obtenerCitasPorTelefono(telefonoBusqueda);

      setCitasPaciente(citasActualizadas);
      setCitaAEditar(null);
      setMensaje("Cita actualizada correctamente");
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

      <div className="max-w-3xl mx-auto relative flex flex-col justify-center items-center gap-10">
        {/* Formulario búsqueda de cita */}
        <form
          onSubmit={buscarCitas}
          className="w-60 lg:w-96 flex flex-col gap-10 justify-center items-center"
        >
          <label
            htmlFor="telefonoBusqueda"
            className="text-lg font-semibold text-cyan-800"
          >
            Introduce tu teléfono móvil:
          </label>
          <input
            id="telefonoBusqueda"
            type="tel"
            name="telefonoBusqueda"
            value={telefonoBusqueda}
            onChange={(e) => setTelefonoBusqueda(e.target.value)}
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
        {mensaje && !loading && !error && (
          <p className="text-cyan-800 text-xl text-center font-bold">
            {mensaje}
          </p>
        )}

        {/* Lista de citas (success state) */}

        {citasPaciente.length > 0 && (
          <div className="w-86 lg:w-xl flex flex-col gap-6">
            {citasPaciente.map((cita) => (
              <div
                key={cita.id}
                className="bg-white text-cyan-700 border-2 border-cyan-700 rounded p-4 shadow"
              >
                <p className="wrap-anywhere">
                  <strong>Nombre y apellido/s:</strong> {cita.nombre}{" "}
                  {cita.apellido}
                </p>
                <p>
                  <strong>Teléfono:</strong> {cita.telefono}
                </p>
                <p>
                  <strong>Servicio:</strong> {cita.servicio}
                </p>
                <p>
                  <strong>Profesional:</strong> {cita.profesional}
                </p>
                <p>
                  <strong>Día:</strong>{" "}
                  {new Date(cita.fecha).toLocaleDateString("es-ES")}
                </p>
                <p>
                  <strong>Hora:</strong> {cita.hora}
                </p>

                <div className="flex flex-row gap-5">
                  <button
                    onClick={() => {
                      setEliminarCitaModal(cita);
                      setMensaje(null);
                      setError(null);
                    }}
                    aria-label="Eliminar cita"
                    className="mt-3 bg-red-700 text-white p-2 rounded shadow shadow-red-950 hover:bg-red-600 transition-colors duration-200 ease-in cursor-pointer"
                  >
                    Eliminar cita
                  </button>
                  <button
                    onClick={() => {
                      setCitaAEditar(cita);
                      setFecha(
                        cita.fecha instanceof Date
                          ? cita.fecha
                          : cita.fecha.toDate(),
                      );
                      setMensaje(null);
                      setError(null);
                    }}
                    aria-label="Modificar cita"
                    className="mt-3 bg-green-700 text-white p-2 rounded shadow shadow-green-950 hover:bg-green-600 transition-colors duration-200 ease-in cursor-pointer"
                  >
                    Modificar cita
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal para eliminar cita/s */}

        {eliminarCitaModal && (
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
                  <strong>Nombre:</strong> {eliminarCitaModal.nombre}{" "}
                  {eliminarCitaModal.apellido}
                </p>
                <p>
                  <strong>Servicio:</strong> {eliminarCitaModal.servicio}
                </p>
                <p>
                  <strong>Día:</strong>{" "}
                  {new Date(eliminarCitaModal.fecha).toLocaleDateString(
                    "es-ES",
                  )}
                </p>
                <p>
                  <strong>Hora:</strong> {eliminarCitaModal.hora}
                </p>
              </div>

              <div className="mt-5 flex justify-center items-center gap-4">
                <button
                  type="button"
                  className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                  onClick={async () => {
                    await eliminarCita(eliminarCitaModal.id);
                    setEliminarCitaModal(null);
                  }}
                  disabled={loading}
                  aria-label={loading ? "Eliminando..." : "Eliminar"}
                >
                  {loading ? "Eliminando..." : "Eliminar"}
                </button>

                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  onClick={() => setEliminarCitaModal(null)}
                >
                  Cancelar
                </button>
              </div>

              {/* Botón para cerrar el modal */}
              <button
                className="absolute top-2 right-2 text-cyan-700 text-2xl cursor-pointer"
                onClick={() => setEliminarCitaModal(null)}
                aria-label="Cerrar modal"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Modal para editar cita/s */}

        {citaAEditar && (
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
                  htmlFor="nueva-fecha"
                  className="font-medium text-cyan-800 mr-2"
                >
                  Selecciona el día
                </label>
                <DatePicker
                  id="nueva-fecha"
                  showIcon
                  selected={fecha}
                  onChange={(date) => setFecha(date)}
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

                <div className="mt-5 flex justify-center items-center gap-4">
                  <button
                    type="button"
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                    onClick={guardarCambios}
                    disabled={loading}
                    aria-label={loading ? "Guardando..." : "Guardar"}
                  >
                    {loading ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                    onClick={() => setCitaAEditar(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>

              {/* Botón para cerrar el modal */}
              <button
                className="absolute top-2 right-2 text-cyan-700 text-2xl cursor-pointer"
                onClick={() => setCitaAEditar(null)}
                aria-label="Cerrar modal"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AuthTelefono;
