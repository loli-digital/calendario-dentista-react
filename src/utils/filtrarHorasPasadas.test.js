import { describe, it, expect } from "vitest";
import { filtrarHorasPasadas } from "./filtrarHorasPasadas";

describe("filtrarHorasPasadas", () => {
  const ahora = new Date("2026-03-25T10:30:00");
  const fechaSeleccionada = new Date("2026-03-25T00:00:00");

  it("devuelve false si la hora ya ha pasado en el día actual", () => {
    const time = new Date("2026-03-25T09:00:00");

    expect(filtrarHorasPasadas(time, fechaSeleccionada, ahora)).toBe(false);
  });

  it("devuelve true si la hora es futura en el día actual", () => {
    const time = new Date("2026-03-25T12:00:00");

    expect(filtrarHorasPasadas(time, fechaSeleccionada, ahora)).toBe(true);
  });

  it("devuelve true si la fecha seleccionada no es hoy", () => {
    const fechaSeleccionada = new Date("2026-03-26T00:00:00");
    const time = new Date("2026-03-26T09:00:00");

    expect(filtrarHorasPasadas(time, fechaSeleccionada, ahora)).toBe(true);
  });
});
