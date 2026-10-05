import { describe, expect } from "vitest";
import { isBookingTimeAllowed } from "@/utils";

describe("isBookingTimeAllowed", () => {
  const now = new Date("2026-10-05T10:30:00");

  expect(
    isBookingTimeAllowed(new Date("2026-10-05T12:29:59"), now),
  ).toBe(false);

  expect(
    isBookingTimeAllowed(new Date("2026-10-05T12:30:00"), now),
  ).toBe(true);
});
