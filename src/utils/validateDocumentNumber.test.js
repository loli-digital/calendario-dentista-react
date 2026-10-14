import { describe, it, expect } from "vitest";
import { validateDocumentNumber } from "@/utils";

describe("validateDocumentNumber", () => {
  it("acepta un DNI válido", () => {
    expect(validateDocumentNumber("dni", "12345678A")).toBe(true);
  });

  it("rechaza un DNI con formato incorrecto", () => {
    expect(validateDocumentNumber("dni", "1234567A")).toBe(false);
  });

  it("acepta un NIE en minúsculas y lo normaliza", () => {
    expect(validateDocumentNumber("nie", "x1234567y")).toBe(true);
  });

  it("acepta un pasaporte válido", () => {
    expect(validateDocumentNumber("passport", "ABC123456")).toBe(true);
  });
});
