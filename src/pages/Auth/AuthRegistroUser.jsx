import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { DecorativeShape } from "@/components";

function AuthRegistroUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeEmail = email.toLowerCase().trim();

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);
      setMensaje(null);

      // Si las contraseñas no coinciden, mostrar un mensaje de error
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return;
      }

      // Registro en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        normalizeEmail,
        password
      );

      const user = userCredential.user;

      // Guarda datos en Firestone
      await setDoc(doc(db, "users", user.uid), {
        normalizeEmail,
        createdAt: new Date(),
        profileCompleted: false,
      });

      setMensaje("Cuenta creada correctamente");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      setError("Ocurrió un problema en el registro. Inténtalo de nuevo");
      console.log(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center overflow-hidden bg-cyan-50">
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

      <h1 className="py-10 relative text-cyan-800 text-center text-4xl font-bold">
        Crea tu cuenta
      </h1>

      {/* Formulario */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="w-[350px] lg:w-l mx-auto p-6 relative rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white flex flex-col justify-center space-y-3"
      >
        <label htmlFor="email" className="font-medium text-cyan-800">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Escribe tu correo electrónico"
          value={email}
          required
          title="Por favor, escribe un correo válido como: nombre@ejemplo.com"
          minLength={3}
          maxLength={64}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
        />

        <label htmlFor="password" className="font-medium text-cyan-800">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mínimo de 8 caracteres"
          value={password}
          required
          minLength={8}
          maxLength={64}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="La contraseña debe contener al menos un número, una mayúscula y una minúscula"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
        />

        <label htmlFor="confirm-password" className="font-medium text-cyan-800">
          Confirmar contraseña
        </label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Mínimo de 8 caracteres"
          value={confirmPassword}
          required
          minLength={8}
          maxLength={64}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="La contraseña debe contener al menos un número, una mayúscula y una minúscula"
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="confirm-password"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
        />

        <input
          type="submit"
          value={loading ? "Creando cuenta..." : "Crear cuenta"}
          disabled={loading}
          className="w-40 mx-auto p-3 mt-5 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600"
        />
      </form>

      {/* Mensaje de error de registro de user */}

      {error && !loading && (
        <p className="relative mb-2 text-red-900 text-lg text-center font-bold">
          {error}
        </p>
      )}

      {/* Mensaje de confirmación de registro de user */}
      {mensaje && (
        <div className="w-full lg:w-xl p-4 my-6 bg-green-100 relative flex flex-col gap-2 border border-green-700 text-green-800 rounded shadow-md">
          <p className="font-bold text-lg mb-2 text-center">{mensaje}</p>
          <p>
            <span className="font-bold underline underline-offset-2">
              <Link to="/auth/login">Inicia sesión</Link>
            </span>{" "}
            para pedir cita o modificar tus datos
          </p>
        </div>
      )}
    </section>
  );
}

export default AuthRegistroUser;
