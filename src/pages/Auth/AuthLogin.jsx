import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { DecorativeShape, Button } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    alert(
      "Si tu email está registrado, recibirás un email para restablecer la contraseña",
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Email en minúsculas y sin espacios
      const normalizeEmail = email.toLowerCase().trim();

      // Conecta con Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        normalizeEmail,
        password,
      );
      console.log("Inicio de sesión correcto: ", userCredential.user);
      setError("");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("El email o la contraseña son incorrectos");
      }
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
        Inicia sesión
      </h1>

      <form
        onSubmit={handleLogin}
        className="w-[350px] lg:w-l mx-auto p-6 relative rounded-md shadow-[0_0_5px_gray] border border-slate-200 bg-white flex flex-col justify-center space-y-5"
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
          title="Escribe un correo válido como: nombre@ejemplo.com"
          minLength={3}
          maxLength={64}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white user-invalid:border-red-900 user-invalid:text-red-900 user-invalid:bg-red-300"
        />

        <label htmlFor="password" className="font-medium text-cyan-800">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
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
            className="w-full border-2 border-cyan-700 rounded-sm pl-2 pr-10 py-1 bg-white peer user-invalid:border-red-900 user-invalid:text-red-900 user-invalid:bg-red-300"
          />
          {/* Botón para mostrar u ocultar contraseña */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-800 hover:cursor-pointer peer-user-invalid:text-red-950"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        {/* Botón para iniciar sesión */}
        <input
          type="submit"
          disabled={loading}
          value={loading ? "Iniciando sesión" : "Iniciar sesión"}
          className="w-40 mx-auto p-3 mt-5 lg:p-4 rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in bg-cyan-700 text-white cursor-pointer hover:bg-cyan-600"
        />

        {/* Botón de prueba para recuperar la contraseña */}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-cyan-900 cursor-pointer hover:underline"
        >
          ¿Olvidaste la contraseña?
        </button>

        {/* Crear nueva cuenta */}
        <p className="mt-5 text-cyan-800 text-center text-m font-bold">
          Crea una cuenta si eres un/a paciente nuevo/a{" "}
        </p>

        {/* Botón para crear cuenta */}
        <Button to="/auth/nueva-cuenta" className="w-40 mx-auto">
          Crear cuenta
        </Button>
      </form>

      {/* Mensaje de error */}
      {error && !loading && (
        <p
          role="alert"
          className="relative my-4 text-red-900 text-lg text-center font-bold"
        >
          {error}
        </p>
      )}
    </section>
  );
}

export default AuthLogin;
