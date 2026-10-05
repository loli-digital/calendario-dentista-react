export function filterPastHours(time, selectedDate, now = new Date()) {
  const dateToCheck = selectedDate ?? time;
  const isSameDay = dateToCheck?.toDateString() === now?.toDateString();

  if (!isSameDay) {
    // Si no es el mismo día, no filtramos por horas pasadas
    return true;
  }

  return time.getTime() > now.getTime();
}
