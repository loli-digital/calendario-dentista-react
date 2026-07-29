import { useState, useMemo } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase.js";
import { validatePhone } from "@/utils/validatePhone";

export function useReservationForm({ servicios = [], profesionales = [] } = {}) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("");
  const [profesional, setProfesional] = useState("");
  const [fecha, setFecha] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [titleSubmit, setTitleSubmit] = useState(false);

  const profesionalesDisponibles = useMemo(() => {
    return profesionales.filter((p) => Array.isArray(p.services) && p.services.includes(Number(servicio)));
  }, [profesionales, servicio]);

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setTelefono("");
    setServicio("");
    setProfesional("");
    setFecha(null);
  };

  const manejarSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Validaciones de todos los campos
    if (!nombre || !apellido || !telefono || !servicio || !profesional) {
      setMensaje("Por favor, rellena todos los campos");
      setError(null);
      return;
    }

    // Validación del teléfono
    if (!validatePhone(telefono)) {
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

    const servicioSeleccionado = servicios.find((s) => s.id === Number(servicio));

    const profesionalSeleccionado = profesionales.find((p) => p.id === profesional);

    try {
      if (!servicioSeleccionado || !profesionalSeleccionado) {
        throw new Error("No se encontró la información del servicio o profesional");
      }

      setLoading(true);
      setError(null);
      setMensaje(null);

      await addDoc(collection(db, "citas"), {
        nombre,
        apellido,
        telefono,
        servicio: servicioSeleccionado.nombre,
        profesional: profesionalSeleccionado.name,
        fecha: Timestamp.fromDate(fecha),
        hora: fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      setTitleSubmit(true);

      setMensaje({
        nombre,
        apellido,
        telefono,
        servicio: servicioSeleccionado.name,
        profesional: profesionalSeleccionado.name,
        fecha: fecha.toLocaleDateString("es-ES"),
        hora: fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      resetForm();
    } catch (err) {
      setError("Ocurrió un problema al reservar la cita. Inténtelo de nuevo.");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    titleSubmit,
    profesionalesDisponibles,
    manejarSubmit,
    resetForm,
  };
}