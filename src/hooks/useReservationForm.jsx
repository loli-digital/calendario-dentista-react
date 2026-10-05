import { useState, useMemo } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase.js";
import { isBookingTimeAllowed } from "@/utils";

export function useReservationForm({
  services = [],
  professionals = [],
  userId,
  onReservationCreated,
} = {}) {
  const [service, setService] = useState("");
  const [professional, setProfessional] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const availableProfessionals = useMemo(() => {
    return professionals.filter(
      (professional) =>
        Array.isArray(professional.services) &&
        professional.services.includes(Number(service)),
    );
  }, [professionals, service]);

  const resetForm = () => {
    setService("");
    setProfessional("");
    setSelectedDate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("Inicia sesión para solicitar una cita");
      setMessage(null);
      return;
    }

    if (!service || !professional) {
      setError("Selecciona un tratamiento y un profesional");
      setMessage(null);
      return;
    }

    if (!selectedDate) {
      setError("Selecciona fecha y hora");
      setMessage(null);
      return;
    }

    // El calendario no permite los domingos (0) y sábados (6), pero se valida también al enviar.
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      setError("Seleccione una fecha entre el lunes y el viernes");
      setMessage(null);
      return;
    }

    const now = new Date();

    if (!isBookingTimeAllowed(selectedDate, now)) {
      setError("Selecciona una hora al menos con 2 horas de antelación");
      setMessage(null);
      return;
    }

    const selectedService = services.find((s) => s.id === Number(service));

    const selectedProfessional = professionals.find(
      (p) => p.id === Number(professional),
    );

    try {
      if (!selectedService || !selectedProfessional) {
        throw new Error(
          "No se encontró la información del servicio o profesional",
        );
      }

      setLoading(true);
      setError(null);
      setMessage(null);

      await addDoc(collection(db, "citas"), {
        userId,
        service: selectedService.name,
        professional: selectedProfessional.name,
        date: Timestamp.fromDate(selectedDate),
        hour: selectedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        state: "Pendiente",
      });

      setMessage({
        service: selectedService.name,
        professional: selectedProfessional.name,
        date: selectedDate.toLocaleDateString("es-ES"),
        hour: selectedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      resetForm();
      onReservationCreated?.();
    } catch (error) {
      setError("Ocurrió un problema al reservar la cita. Inténtelo de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
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
    handleSubmit,
    resetForm,
  };
}
