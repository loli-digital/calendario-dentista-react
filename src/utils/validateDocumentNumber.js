export function validateDocumentNumber(type, value = "") {
  const cleanValue = String(value).trim();

  const patterns = {
    dni: /^[0-9]{8}[A-Z]$/,
    nie: /^[XYZ][0-9]{7}[A-Z]$/,
    passport: /^[A-Z]{3}[0-9]{6}$/,
  };

  if (!type || !patterns[type]) {
    return false;
  }

  return patterns[type].test(cleanValue.toUpperCase());
}
