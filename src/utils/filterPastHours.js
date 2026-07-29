export function filterPastHours(
  time,
  selectedDate,
  now = new Date(),
) {
  if (!selectedDate) {
    // Si no hay fecha seleccionada, no filtramos por horas pasadas
    return true;
  }

  const isSameDay = selectedDate.toDateString() === now.toDateString();

  if (!isSameDay) {
    // Si no es el mismo día, no filtramos por horas pasadas
    return true;
  }

  return time.getTime() > now.getTime();
}
