import { describe, it, expect } from "vitest";
import { validatePhone } from "@/utils";

describe("validatePhone", () => {
  it("acepta un teléfono válido", () => {
    expect(validatePhone("612345678")).toBe(true);
  });

  it("rechaza un teléfono corto", () => {
    expect(validatePhone("123")).toBe(false);
  });

  it("rechaza vacío", () => {
    expect(validatePhone("")).toBe(false);
  });
});
