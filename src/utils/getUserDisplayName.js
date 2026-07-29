export function getUserDisplayName(user, userData = {}) {
  if (user?.displayName) {
    return user.displayName;
  }

  const nombre = userData?.displayName || userData?.nombre || "";
  const apellido = userData?.apellido || "";

  if (nombre && apellido) {
    return `${nombre} ${apellido}`.trim();
  }

  if (nombre) {
    return nombre;
  }

  if (user?.email) {
    return user.email;
  }

  return "";
}
