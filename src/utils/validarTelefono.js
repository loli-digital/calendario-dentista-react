export function validarTelefono(telefono) {
  const telefonoLimpio = telefono.trim().replace(/\s+/g, "");
  return /^\d{9}$/.test(telefonoLimpio);
}
