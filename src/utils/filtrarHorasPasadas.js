export function filtrarHorasPasadas(time, fechaSeleccionada, ahora = new Date()) {

  if (!fechaSeleccionada) {
    // Si no hay fecha seleccionada, no filtramos por horas pasadas
    return true;
  }

  const esMismoDia = fechaSeleccionada.toDateString() === ahora.toDateString();

  if (!esMismoDia) {
    // Si no es el mismo día, no filtramos por horas pasadas
    return true;
  }

  return time.getTime() > ahora.getTime();
};