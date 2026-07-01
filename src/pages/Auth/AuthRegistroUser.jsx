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
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCreado, setUserCreado] = useState(null);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);
      setMensaje(null);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        telefono,
        email,
      });

      setMensaje("Cuenta creada correctamente");

      setUserCreado({
        nombre,
        apellido,
        telefono,
        email,
      });

      setEmail("");
      setPassword("");
      setNombre("");
      setApellido("");
      setTelefono("");
    } catch (error) {
      setError(
        "Ocurrió un problema en el registro de usuario/a. Inténtalo de nuevo",
      );
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
        className="w-[350px] lg:w-l mx-auto relative flex flex-col justify-center space-y-5"
      >
        <label htmlFor="nombre" className="font-medium text-cyan-800">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="María"
          minLength={3}
          maxLength={40}
          pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s-]+"
          title="Escribe un mínimo de 3 letras hasta un máximo de 40"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          autoComplete="given-name"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
        />

        <label htmlFor="apellido" className="font-medium text-cyan-800">
          Apellido
        </label>
        <input
          type="text"
          name="apellido"
          id="apellido"
          placeholder="Gutiérrez"
          value={apellido}
          required
          minLength={3}
          maxLength={40}
          pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s-]+"
          title="Escribe un mínimo de 3 letras hasta un máximo de 40"
          onChange={(e) => setApellido(e.target.value)}
          autoComplete="family-name"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
        />

        <label htmlFor="telefono" className="font-medium text-cyan-800">
          Teléfono
        </label>
        <input
          type="text"
          name="telefono"
          id="telefono"
          placeholder="123456789"
          value={telefono}
          required
          pattern="[0-9]{9}"
          title="Escribe un teléfono de 9 dígitos"
          onChange={(e) => setTelefono(e.target.value)}
          autoComplete="tel"
          className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
        />

        <label htmlFor="email" className="font-medium text-cyan-800">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="nombre@ejemplo.com"
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
          <p>Nombre: {userCreado.nombre}</p>
          <p>Apellido/s: {userCreado.apellido}</p>
          <p>Teléfono: {userCreado.telefono}</p>
          <p>Email: {userCreado.email}</p>
          <p>
            <span className="font-bold underline underline-offset-2">
              <Link to="/mis-citas/login">Inicia sesión</Link>
            </span>{" "}
            para pedir cita o modificar tus datos
          </p>
        </div>
      )}
    </section>
  );
}

export default AuthRegistroUser;
