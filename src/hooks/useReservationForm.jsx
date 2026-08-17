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
      setMessage("Por favor, rellena todos los campos");
      setError(null);
      return;
    }

    // Validación del teléfono
    if (!validatePhone(phoneNumber)) {
      setMessage("El teléfono introducido debe tener 9 dígitos");
      setLoading(false);
      setError(null);
      return;
    }

    // Mensaje error si intenta registrar una fecha inválida
    if (!selectedDate || selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      setMessage("Seleccione una fecha entre el lunes y el viernes");
      setError(null);
      return;
    }

    const selectedService = services.find((service) => service.id === Number(service));

    const selectedProfessional = professionals.find((professional) => professional.id === professional);

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
    } catch (err) {
      setError("Ocurrió un problema al reservar la cita. Inténtelo de nuevo.");
      console.log(err.message);
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