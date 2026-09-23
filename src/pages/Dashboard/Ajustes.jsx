import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Button } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

function Ajustes() {
  const { handleSubmit } = useForm();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [consent, setConsent] = useState(false);
  const [contactPreferences, setContactPreferences] = useState([]);
  const [contactPreferencesError, setContactPreferencesError] = useState("");

  // Estado para confirmar eliminación de la cuenta
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Estados para cuando Firebase requiera autenticación para eliminar la cuenta
  const [password, setPassword] = useState("");
  const [showModalPassword, setShowModalPassword] = useState(false);

  // Preferencias de contacto
  const toggleContactPreference = (value) => {
    setContactPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );

    setContactPreferencesError("");
  };

  // Para guardar los datos en Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.exists() ? userDoc.data() : {};

      setUserInfo({
        uid: user.uid,
        idPaciente: data.id_paciente,
        registrationDate: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : user.metadata.creationTime,
      });

      setConsent(Boolean(data.consentForNotifications));
      setContactPreferences(data.contactPreferences ?? []);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Guardar los ajustes al hacer click en el botón
  const handleSave = async () => {
    if (!auth.currentUser) return;

    if (contactPreferences.length === 0) {
      setContactPreferencesError("Elige una forma de contacto");
      return;
    }

    setContactPreferencesError("");
    setIsSaving(true);

    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        consentForNotifications: consent,
        contactPreferences: contactPreferences,
      });
    } catch (error) {
      console.error("Error al guardar ajustes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Para eliminar la cuenta de user
  const handleDeleteAccount = () => {
    if (!auth.currentUser?.email) return;

    setError(null);
    setShowDeleteConfirmation(true);
  };

  // Para confirmar la eliminación de la cuenta
  const handleConfirmDeleteAccount = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser?.email) return;

    setShowDeleteConfirmation(false);
    setIsDeleting(true);
    setError(null);

    try {
      // Eliminar el documento de usuario en Firestone
      await deleteDoc(doc(db, "users", currentUser.uid));

      // Elimina la cuenta en Firebase Authentication
      await deleteUser(currentUser);

      // Redirigimos a la página de confirmación de eliminación de la cuenta
      window.location.replace("/cuenta-eliminada");

      console.info("Tu cuenta y tus datos han sido eliminados");
    } catch (error) {
      console.error("Error al eliminar la cuenta: ", error);

      // Si el user lleva mucho tiempo identificado
      if (error.code === "auth/requires-recent-login") {
        setShowModalPassword(true);
      } else {
        setError("No se pudo eliminar tu cuenta, intentalo más tarde");
      }
      setIsDeleting(false);
    }
  };

  // Lógica para reutenticación de la cuenta, si lo pide Firebase
  const handleReauthenticateAndDelete = async (event) => {
    event.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser?.email || !password) {
      setError("Introduce tu contraseña.");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password,
      );

      await reauthenticateWithCredential(currentUser, credential);
      await deleteUser(currentUser);

      window.location.replace("/cuenta-eliminada");
    } catch (error) {
      console.error("Error al reautenticar:", error);

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        setError("La contraseña no es correcta.");
      } else {
        setError("No se pudo reautenticar la cuenta.");
      }

      setIsDeleting(false);
    }
  };

  // Mientras la página está cargando datos
  if (loading) {
    return (
      <section className="w-full h-full p-3 lg:p-10 flex justify-center items-center">
        <p className="text-center">Cargando datos...</p>
      </section>
    );
  }

  return (
    <section className="w-full h-full p-3 lg:p-10 flex justify-center">
      <form
        onSubmit={handleSubmit(handleSave)}
        aria-busy={isSaving}
        className="w-full lg:w-auto h-auto mx-auto flex flex-col flex-nowrap justify-center items-stretch gap-8"
      >
        <div className="form__container--data-show">
          {/* ID paciente */}
          <p>
            <span className="form__p--ajustes">ID paciente:</span>{" "}
            {userInfo?.idPaciente ?? "ID no disponible"}
          </p>

          {/* Fecha registro paciente */}
          <p>
            <span className="form__p--ajustes">Fecha registro: </span>
            {userInfo?.registrationDate
              ? new Date(userInfo.registrationDate).toLocaleDateString(
                  "es-ES",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  },
                )
              : "Fecha no disponible"}
          </p>

          {/* Recibir recordatorios de citas */}
          <div className="flex flex-row gap-2 rounded-sm p-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-700">
            <input
              type="checkbox"
              name="consent-for-notifications"
              id="consent-for-notifications"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="cursor-pointer focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-600
                  focus-visible:ring-offset-2"
            />
            <label
              htmlFor="consent-for-notifications"
              className="cursor-pointer"
            >
              Acepto recibir recordatorios de citas
            </label>
          </div>

          {/* Preferencias de contacto */}
          <fieldset
            aria-describedby={
              contactPreferencesError ? "contact-preferences-error" : undefined
            }
            className="flex flex-col gap-2"
          >
            <legend className="form__p--ajustes">
              Preferencias de contacto
            </legend>

            <div className="flex flex-row gap-2 mt-2 rounded-sm p-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-700">
              <input
                type="checkbox"
                id="whatsapp"
                name="whatsapp"
                checked={contactPreferences.includes("whatsapp")}
                onChange={() => toggleContactPreference("whatsapp")}
                className="
                  cursor-pointer
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-600
                  focus-visible:ring-offset-2
                "
              />
              <label htmlFor="whatsapp" className="cursor-pointer">
                WhatsApp
              </label>
            </div>

            <div className="flex flex-row gap-2 rounded-sm p-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-700">
              <input
                type="checkbox"
                id="phone-call"
                name="phone-call"
                checked={contactPreferences.includes("phone-call")}
                onChange={() => toggleContactPreference("phone-call")}
                className="
                  cursor-pointer
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-600
                  focus-visible:ring-offset-2
                "
              />
              <label htmlFor="phone-call" className="cursor-pointer">
                Llamada telefónica
              </label>
            </div>

            <div className="flex flex-row gap-2 rounded-sm p-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-700">
              <input
                type="checkbox"
                id="email"
                name="email"
                checked={contactPreferences.includes("email")}
                onChange={() => toggleContactPreference("email")}
                className="
                  cursor-pointer
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-600
                  focus-visible:ring-offset-2
                "
              />
              <label htmlFor="email" className="cursor-pointer">
                Email
              </label>
            </div>

            {contactPreferencesError && (
              <p
                id="contact-preferences-error"
                role="alert"
                className="text-red-800"
              >
                <FontAwesomeIcon icon={faSquareXmark} aria-hidden="true" />
                <span>{contactPreferencesError}</span>
              </p>
            )}
          </fieldset>
        </div>
        <input
          type="submit"
          value={isSaving ? "Guardando..." : "Guardar"}
          disabled={isSaving}
          className={`w-40 mx-auto bg-cyan-700 text-white p-3 cursor-pointer rounded-sm shadow-[0_0_5px_black] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-950 transition-colors duration-200 ease-in hover:bg-cyan-600 hover:shadow-[0_0_5px_#fff] ${isSaving ? "bg-cyan-400 cursor-not-allowed" : ""}`}
        />
        <Button
          onClick={handleDeleteAccount}
          deleteButton={true}
          disabled={isDeleting}
          className="w-50 mx-auto"
        >
          {isDeleting ? "Eliminando" : "Eliminar cuenta y datos"}
        </Button>

        {error && (
          <span className="text-red-800">
            <FontAwesomeIcon icon={faSquareXmark} />
            {error}
          </span>
        )}
      </form>

      {/* Modal para confirmar la eliminación de datos y la cuenta */}
      {showDeleteConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-900/80 px-5"
          role="presentation"
        >
          <div
            className="relative flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            aria-describedby="delete-account-description"
          >
            <h2
              id="delete-account-title"
              className="text-xl text-center font-bold text-cyan-800"
            >
              ¿Eliminar cuenta?
            </h2>

            <p id="delete-account-description" className="text-cyan-700 text-center">
              ¿Seguro que quieres eliminar tu cuenta y todos tus datos? Esta
              acción no se puede deshacer.
            </p>

            <div className="mt-4 flex justify-center gap-4">
              <Button
                type="button"
                deleteButton
                onClick={handleConfirmDeleteAccount}
                disabled={isDeleting}
              >
                Sí, eliminar cuenta
              </Button>

              <Button
                type="button"
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={isDeleting}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Cancelar
              </Button>
            </div>

            <Button
              type="button"
              onClick={() => setShowDeleteConfirmation(false)}
              aria-label="Cerrar confirmación"
              className="absolute right-2 top-2 h-8 w-8 bg-red-800 p-1 text-2xl"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Modal para cuando Firebase pide reautenticación de la cuenta */}
      {showModalPassword && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-900/80 px-5"
          role="presentation"
        >
          <div
            className="relative flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="password-modal-title"
            aria-describedby="password-modal-description"
          >
            <h2
              id="password-modal-title"
              className="text-xl font-bold text-cyan-800"
            >
              Confirma tu contraseña
            </h2>

            <p id="password-modal-description" className="text-cyan-700">
              Por seguridad, Firebase necesita que confirmes tu identidad antes
              de eliminar la cuenta.
            </p>

            <form onSubmit={handleReauthenticateAndDelete}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="delete-password"
                  className="font-medium text-cyan-800"
                >
                  Contraseña actual
                </label>

                <input
                  id="delete-password"
                  name="delete-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  autoFocus
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "password-modal-error" : undefined}
                  className="
              rounded-sm border-2 border-cyan-700 px-2 py-1
              focus:outline-none focus:ring-2 focus:ring-cyan-500
            "
                />
              </div>

              {error && (
                <p
                  id="password-modal-error"
                  role="alert"
                  className="mt-3 text-red-800"
                >
                  <FontAwesomeIcon icon={faSquareXmark} aria-hidden="true" />
                  <span>{error}</span>
                </p>
              )}

              <div className="mt-5 flex justify-center gap-4">
                <Button type="submit" deleteButton disabled={isDeleting}>
                  {isDeleting ? "Eliminando..." : "Confirmar eliminación"}
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    setShowModalPassword(false);
                    setPassword("");
                    setError(null);
                  }}
                  disabled={isDeleting}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Cancelar
                </Button>
              </div>
            </form>

            <Button
              type="button"
              onClick={() => {
                setShowModalPassword(false);
                setPassword("");
                setError(null);
              }}
              disabled={isDeleting}
              aria-label="Cerrar modal de contraseña"
              className="absolute right-2 top-2 h-8 w-8 bg-red-800 p-1 text-2xl hover:bg-red-900"
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Ajustes;
