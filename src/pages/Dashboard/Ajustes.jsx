import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button } from "@/components";

function Ajustes() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [consent, setConsent] = useState(false);
  const [contactPreference, setContactPreference] = useState("whatsapp");

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
        fechaRegistro: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : user.metadata.creationTime,
      });

      setConsent(Boolean(data.consentForNotifications));
      setContactPreference(data.preferencia_comunicacion || "whatsapp");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    setIsSaving(true);

    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        consentForNotifications: consent,
        preferencia_comunicacion: contactPreference,
      });
    } catch (error) {
      console.error("Error al guardar ajustes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full h-full p-10 flex justify-center items-center">
        <p className="text-center">Cargando datos...</p>
      </section>
    );
  }

  return (
    <section className="w-full h-full p-10 flex justify-center">
      <form
        onSubmit={handleSave}
        className="w-auto h-auto mx-auto flex flex-col flex-nowrap justify-center items-stretch gap-8"
      >
        <div className="form__container--data-show">
          <p>ID paciente: {userInfo?.uid || "ID no disponible"}</p>
          <p>
            Fecha registro:
            {userInfo?.fechaRegistro
              ? new Date(userInfo.fechaRegistro).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Fecha no disponible"}
          </p>
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

          <label htmlFor="contact-preferences">Preferencias de contacto</label>
          <select
            name="contact-preferences"
            id="contact-preferences"
            value={contactPreference}
            onChange={(e) => setContactPreference(e.target.value)}
          >
            <option value="">Selecciona</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone-call">Llamada telefónica</option>
            <option value="email">Email</option>
          </select>
        </div>
        <input
          type="submit"
          value={isSaving ? "Guardando..." : "Guardar"}
          disabled={isSaving}
          className={`w-40 mx-auto mt-4 bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600 ${isSaving ? "bg-cyan-400 cursor-not-allowed" : ""}`}
        />
        <Button className="w-50 mx-auto">Eliminar cuenta y datos</Button>
      </form>
    </section>
  );
}

export default Ajustes;
