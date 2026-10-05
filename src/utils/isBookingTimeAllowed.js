export function isBookingTimeAllowed(time, now = new Date()) {
  if (!time || Number.isNaN(time.getTime())) return false;

  // Calcula la hora mínima permitida (cogiendo la hora actual, 2 horas después de ésta)
  const minimumTime = now.getTime() + 2 * 60 * 60 * 1000;

  return time.getTime() >= minimumTime;
}
