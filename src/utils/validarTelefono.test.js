import { describe, it, expect } from "vitest";
import { validarTelefono } from "./validarTelefono";

describe("validarTelefono", () => {
  it("acepta un teléfono válido", () => {
    expect(validarTelefono("612345678")).toBe(true);
  });

  it("rechaza un teléfono corto", () => {
    expect(validarTelefono("123")).toBe(false);
  });

  it("rechaza vacío", () => {
    expect(validarTelefono("")).toBe(false);
  });
});
