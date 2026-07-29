export function validatePhone(phone) {
  const cleanPhone = phone.trim().replace(/\s+/g, "");
  return /^\d{9}$/.test(cleanPhone);
}
