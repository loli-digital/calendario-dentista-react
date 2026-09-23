import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { deleteUser, onAuthStateChanged } from "firebase/auth";
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

  const toggleContactPreference = (value) => {
    setContactPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );

    setContactPreferencesError("");
  };

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
  const handleDeleteAccount = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar tu cuenta y todos tus datos?",
    );

    if (!confirmed) return;

    setLoading(true);
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
        setError(
          "Por seguridad, vuelve a iniciar sesión antes de eliminar tu cuenta",
        );
      } else {
        setError("No se pudo eliminar tu cuenta, intentalo más tarde");
      }
    } finally {
      setLoading(false);
    }
  };

  {/* Mientras la página está cargando datos */}

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
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              name="consent-for-notifications"
              id="consent-for-notifications"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="cursor-pointer"
            />
            <label
              htmlFor="consent-for-notifications"
              className="cursor-pointer"
            >
              Acepto recibir recordatorios de citas
            </label>
          </div>

          {/* Preferencias de contacto */}
          <label htmlFor="contact-preferences" className="form__p--ajustes">
            Preferencias de contacto
          </label>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="whatsapp"
              name="whatsapp"
              className="cursor-pointer"
              checked={contactPreferences?.includes("whatsapp")}
              onChange={() => toggleContactPreference("whatsapp")}
            />
            <label htmlFor="whatsapp" className="cursor-pointer">
              WhatsApp
            </label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="phone-call"
              name="phone-call"
              className="cursor-pointer"
              checked={contactPreferences.includes("phone-call")}
              onChange={() => toggleContactPreference("phone-call")}
            />
            <label htmlFor="phone-call" className="cursor-pointer">
              Llamada telefónica
            </label>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="email"
              name="email"
              className="cursor-pointer"
              checked={contactPreferences.includes("email")}
              onChange={() => toggleContactPreference("email")}
            />
            <label htmlFor="email" className="cursor-pointer">
              Email
            </label>
          </div>

          {contactPreferencesError && (
            <span className="text-red-800">
              <FontAwesomeIcon icon={faSquareXmark} />
              {contactPreferencesError}
            </span>
          )}
        </div>
        <input
          type="submit"
          value={isSaving ? "Guardando..." : "Guardar"}
          disabled={isSaving}
          className={`w-40 mx-auto bg-cyan-700 text-white p-3 cursor-pointer rounded-sm shadow-[0_0_5px_black] focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors duration-200 ease-in hover:bg-cyan-600 ${isSaving ? "bg-cyan-400 cursor-not-allowed" : ""}`}
        />
        <Button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="w-50 mx-auto bg-red-800 hover:bg-red-900 focus:ring-red-950"
        >
          {loading ? "Eliminando" : "Eliminar cuenta y datos"}
        </Button>

        {error && (
          <span className="text-red-800">
            <FontAwesomeIcon icon={faSquareXmark} />
            {error}
          </span>
        )}
      </form>
    </section>
  );
}

export default Ajustes;
