import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

function MisDatos() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      tipoIdentificacion: "",
      numIdentificacion: "",
      direccion: "",
      fechaNacimiento: "",
      email: "",
      telefono: "",
      companiaSeguro: "",
      numCompaniaSeguro: "",
    },
  });

  useEffect(() => {
    async function fetchUserData() {
      const userData = await getUserDataFromDB();
      reset(userData);
    }
    fetchUserData();
  }, [reset]);

  const onSubmit = (data) => console.log(data);

  const tipoIdentificacion = watch("tipoIdentificacion");
  const companiaSeguro = watch("companiaSeguro");

  const placeholderIdentificacion = {
    dni: "12345678A",
    nie: "X1234567Y",
    pasaporte: "ABC123456",
  };

  const patronIdentificacion = {
    dni: /^[0-9]{8}[A-Z]$/,
    nie: /^[XYZ][0-9]{7}[A-Z]$/,
    pasaporte: /^[A-Z]{3}[0-9]{6}$/,
  };

  const numCompaniaSeguro = {
    asisa: /^[0-9]{12,15}$/,
    sanitas: /^[0-9]{9,12}$/,
    adeslas: /^[0-9]{10,12}$/,
    mapfre: /^[0-9]{10,12}$/,
    dkv: /^[0-9]{10,12}$/,
  };

  // Manejo de estados

  const [loading, SetLoading] = useState();
  //const [error, SetError] = useState();
  //const [message, SetMessage] = useState();

  return (
    <section className="w-full h-full p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-auto mx-auto flex flex-col flex-nowrap justify-center items-stretch gap-3"
      >
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-5">
          <div className="w-full flex flex-col gap-2">
            {/*Nombre*/}
            <label htmlFor="nombre" className="font-medium text-cyan-800">
              Nombre:
            </label>
            <input
              type="text"
              placeholder="Escribe tu nombre"
              {...register("nombre", { required: true, maxLength: 80 })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            />

            {/*Apellido/s*/}
            <label htmlFor="apellido" className="font-medium text-cyan-800">
              Apellido/s:
            </label>
            <input
              type="text"
              placeholder="Escribe tu/s apellido/s"
              {...register("apellido", { required: true, maxLength: 100 })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            />

            {/*Tipo de identificación*/}
            <label
              htmlFor="tipoIdentificacion"
              className="font-medium text-cyan-800"
            >
              Tipo de identificación:
            </label>
            <select
              {...register("tipoIdentificacion", { required: true })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            >
              <option value="" selected>
                Seleccionar
              </option>
              <option value="dni">DNI</option>
              <option value="nie">NIE</option>
              <option value="pasaporte">Pasaporte</option>
            </select>

            {errors.tipoIdentificacion && (
              <p className="text-center">{errors.tipoIdentificacion.message}</p>
            )}

            {tipoIdentificacion && (
              <input
                type="text"
                placeholder={placeholderIdentificacion[tipoIdentificacion]}
                {...register("numIdentificacion", {
                  required: true,
                  pattern: patronIdentificacion[tipoIdentificacion],
                })}
                className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
              />
            )}

            {errors.numIdentificacion && (
              <p className="text-center">{errors.numIdentificacion.message}</p>
            )}

            {/*Dirección*/}
            <label htmlFor="direccion" className="font-medium text-cyan-800">
              Dirección:
            </label>
            <input
              type="text"
              placeholder="Escribe tu dirección"
              {...register("direccion", { required: true, maxLength: 200 })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            {/*Fecha de nacimiento*/}
            <label
              htmlFor="fechaNacimiento"
              className="font-medium text-cyan-800"
            >
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              {...register("fechaNacimiento", { required: true })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            />

            {/*Correo electrónico*/}
            <label htmlFor="email" className="font-medium text-cyan-800">
              Correo electrónico:
            </label>
            <input
              type="email"
              placeholder="Escribe tu correo electrónico"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            />

            {/*Teléfono*/}
            <label htmlFor="telefono" className="font-medium text-cyan-800">
              Teléfono:
            </label>
            <input
              type="tel"
              placeholder="Escribe tu teléfono"
              {...register("telefono", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            />

            {/*Compañía de seguro dental*/}
            <label
              htmlFor="companiaSeguro"
              className="font-medium text-cyan-800"
            >
              Compañía de seguro dental:
            </label>
            <select
              {...register("companiaSeguro", { required: true })}
              className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
            >
              <option value="" selected>
                Seleccionar
              </option>
              <option value="no">No tengo compañía de seguro dental</option>
              <option value="asisa">ASISA</option>
              <option value="sanitas">SANITAS</option>
              <option value="adeslas">ADESLAS</option>
              <option value="mapfre">MAPFRE</option>
              <option value="dkv">DKV</option>
            </select>

            {errors.companiaSeguro && <p>{errors.companiaSeguro.message}</p>}

            {companiaSeguro && companiaSeguro != "no" && (
              <input
                type="text"
                placeholder="123456789123"
                {...register("numCompaniaSeguro", {
                  required: true,
                  pattern: numCompaniaSeguro[companiaSeguro],
                })}
                className="border-2 border-cyan-700 rounded-sm pl-2 py-1 bg-white"
              />
            )}
          </div>
        </div>

        <input
          type="submit"
          value={loading ? "Guardando..." : "Guardar"}
          disabled={loading}
          className={`w-40 mx-auto mt-4 bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600 ${loading ? "bg-cyan-400 cursor-not-allowed" : ""}`}
        />
      </form>
    </section>
  );
}

export default MisDatos;
