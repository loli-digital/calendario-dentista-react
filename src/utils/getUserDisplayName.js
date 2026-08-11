export function getUserDisplayName(user, userData = {}) {
  if (user?.displayName) {
    return user?.displayName;
  }

  const name = userData?.displayName ?? userData?.name ?? "";
  const lastName = userData?.lastName ?? "";

  if (name && lastName) {
    return `${name} ${lastName}`.trim();
  }

  if (name) {
    return name;
  }

  if (user?.email) {
    return user?.email;
  }

  return "";
}
