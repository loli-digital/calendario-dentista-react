export function filtrarHorasPasadas(time) {
    
    const ahora = new Date();
    const fecha = new Date();
    const fechaSeleccionada = fecha;

    if (fechaSeleccionada.toDateString() === ahora.toDateString()) {
      return ahora.getTime() < time.getTime();
    }

    return true;
  };