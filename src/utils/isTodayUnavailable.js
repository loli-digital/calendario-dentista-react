export function isTodayUnavailable(date, now = new Date()) {
  if (!date) {
    return false;
  }

  const isToday = date.toDateString() === now.toDateString();
  const isAfterTwoPm =
    now.getHours() > 14 ||
    (now.getHours() === 14 &&
      (now.getMinutes() > 0 ||
        now.getSeconds() > 0 ||
        now.getMilliseconds() > 0));

  return isToday && isAfterTwoPm;
}
