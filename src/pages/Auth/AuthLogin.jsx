import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { Link } from "react-router-dom";
import { DecorativeShape } from "@/components";

function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = () => {
    alert("Si tu email está registrado, recibirás un email para restablecer la contraseña");
  }

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión correcto");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="w-full min-h-dvh py-10 px-5 relative flex flex-col justify-start items-center overflow-hidden bg-cyan-50">
      {/* Forma para detrás de las cards */}
      <DecorativeShape />

      <h1 className="py-10 relative text-cyan-800 text-center text-4xl font-bold">
        Inicia sesión
      </h1>

      <form className="w-[350px] lg:w-l mx-auto p-6 relative rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white flex flex-col justify-center space-y-5">
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
          placeholder="Escribe tu contraseña"
          value={password}
          required
          minLength={8}
          maxLength={64}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="La contraseña debe contener al menos un número, una mayúscula y una minúscula"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
        />

        {/* Botón para iniciar sesión */}
        <Link to="/dashboard" className="mx-auto p-3">
          <button
            onClick={handleLogin}
            className="w-40 mx-auto p-3 mt-5 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600"
          >
            Iniciar sesión
          </button>
        </Link>

        {/* Enlace para recuperar la contraseña */}
        <Link className="text-center mb-0">
          <button
            onClick={handleForgotPassword}
            className="text-cyan-900 cursor-pointer hover:underline"
          >
            ¿Olvidaste la contraseña?
          </button>
        </Link>

        {/* Crear nueva cuenta */}
        <p className="mt-5 text-cyan-800 text-center text-m font-bold">
          Crea una cuenta si eres un/a paciente nuevo/a{" "}
        </p>

        <Link to="/auth/nueva-cuenta" className="mx-auto p-3">
          <button
            onClick={handleLogin}
            className="w-40 p-3 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600"
          >
            Crear cuenta
          </button>
        </Link>
      </form>
    </section>
  );
}

export default AuthLogin;
