export function appointments(existingAppointments, selectedDate) {
  if (
    !Array.isArray(existingAppointments) ||
    !(selectedDate instanceof Date) ||
    Number.isNaN(selectedDate.getTime())
  ) {
    return false;
  }

  const hasAppointmentAtSameTime = existingAppointments.some(
    (appointment) => {
      const existingDate = appointment.date?.toDate
        ? appointment.date.toDate()
        : appointment.date instanceof Date
          ? appointment.date
          : new Date(appointment.date);

      if (Number.isNaN(existingDate.getTime())) {
        return false;
      }

      return (
        existingDate.getFullYear() === selectedDate.getFullYear() &&
        existingDate.getMonth() === selectedDate.getMonth() &&
        existingDate.getDate() === selectedDate.getDate() &&
        existingDate.getHours() === selectedDate.getHours() &&
        existingDate.getMinutes() === selectedDate.getMinutes()
      );
    },
  );

  return !hasAppointmentAtSameTime;
}