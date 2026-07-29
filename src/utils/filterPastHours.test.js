import { describe, it, expect } from "vitest";
import { filterPastHours } from "@/utils";

describe("filterPastHours", () => {
  const now = new Date("2026-03-25T10:30:00");
  const selectedDate = new Date("2026-03-25T00:00:00");

  it("returns false when the time has already passed on the current day", () => {
    const time = new Date("2026-03-25T09:00:00");

    expect(filterPastHours(time, selectedDate, now)).toBe(false);
  });

  it("returns true when the time is in the future on the current day", () => {
    const time = new Date("2026-03-25T12:00:00");

    expect(filterPastHours(time, selectedDate, now)).toBe(true);
  });

  it("returns true when the selected date is not today", () => {
    const laterSelectedDate = new Date("2026-03-26T00:00:00");
    const time = new Date("2026-03-26T09:00:00");

    expect(filterPastHours(time, laterSelectedDate, now)).toBe(true);
  });
});
