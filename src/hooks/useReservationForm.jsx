import { useState, useMemo } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase.js";
import { validatePhone } from "@/utils/validatePhone";

export function useReservationForm({ services = [], professionals = [] } = {}) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("");
  const [professional, setProfessional] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [titleSubmit, setTitleSubmit] = useState(false);

  const availableProfessionals = useMemo(() => {
    return professionals.filter((professional) => Array.isArray(professional.services) && professional.services.includes(Number(service)));
  }, [professionals, service]);

  const resetForm = () => {
    setName("");
    setLastName("");
    setPhoneNumber("");
    setService("");
    setProfessional("");
    setSelectedDate(null);
  };

  const manejarSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Validaciones de todos los campos
    if (!name || !lastName || !phoneNumber || !service || !professional) {
      setError("Por favor, rellena todos los campos");
      setMessage(null);
      return;
    }

    // Validación del teléfono
    if (!validatePhone(phoneNumber)) {
      setError("El teléfono introducido debe tener 9 dígitos");
      setMessage(null);
      return;
    }

    if (!selectedDate) {
      setError("Selecciona fecha y hora");
      setMessage(null);
      return;
    }

    // El calendario no permite estos días, pero se valida también al enviar.
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      setError("Seleccione una fecha entre el lunes y el viernes");
      setMessage(null);
      return;
    }

    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();
    const isAfterTwoPm =
      now.getHours() > 14 ||
      (now.getHours() === 14 &&
        (now.getMinutes() > 0 ||
          now.getSeconds() > 0 ||
          now.getMilliseconds() > 0));

    if (isToday && isAfterTwoPm) {
      setError("Después de las 14:00 no se pueden pedir citas para hoy");
      setMessage(null);
      return;
    }

    if (selectedDate.getTime() <= now.getTime()) {
      setError("La hora seleccionada ya ha pasado. Selecciona otra hora");
      setMessage(null);
      return;
    }

    const selectedService = services.find((s) => s.id === Number(service));

    const selectedProfessional = professionals.find(
      (p) => p.id === Number(professional),
    );

    try {
      if (!selectedService || !selectedProfessional) {
        throw new Error("No se encontró la información del servicio o profesional");
      }

      setLoading(true);
      setError(null);
      setMessage(null);

      await addDoc(collection(db, "citas"), {
        name,
        lastName,
        phoneNumber,
        service: selectedService.name,
        professional: selectedProfessional.name,
        date: Timestamp.fromDate(selectedDate),
        hora: selectedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      setTitleSubmit(true);

      setMessage({
        name,
        lastName,
        phoneNumber,
        service: selectedService.name,
        professional: selectedProfessional.name,
        date: selectedDate.toLocaleDateString("es-ES"),
        hora: selectedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      resetForm();
    } catch (error) {
      setError("Ocurrió un problema al reservar la cita. Inténtelo de nuevo.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    resetForm,
  };
}