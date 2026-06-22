import { useForm } from "react-hook-form";

function MisDatos() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  return (
    <section>
      <h1 className="py-10 relative text-cyan-800 text-center text-4xl font-bold">
        Mis datos
      </h1>

      <div className="dashboard-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*Nombre*/}
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", { required: true, maxLength: 80 })}
          />

          {/*Apellido/s*/}
          <label htmlFor="apellido">Apellido/s:</label>
          <input
            type="text"
            placeholder="Apellido/s"
            {...register("apellido", { required: true, maxLength: 100 })}
          />

          {/*Tipo de identificación*/}
          <label htmlFor="tipoIdentificacion">Tipo de identificación:</label>
          <select {...register("tipoIdentificacion", { required: true })}>
            <option value="" selected>
              Seleccionar
            </option>
            <option value="dni">DNI</option>
            <option value="nie">NIE</option>
            <option value="pasaporte">Pasaporte</option>
          </select>

          {errors.tipoIdentificacion && (
            <p>{errors.tipoIdentificacion.message}</p>
          )}

          {tipoIdentificacion && (
            <input
              type="text"
              placeholder={placeholderIdentificacion[tipoIdentificacion]}
              {...register("numIdentificacion", {
                required: true,
                pattern: patronIdentificacion[tipoIdentificacion],
              })}
            />
          )}

          {errors.numIdentificacion && (
            <p>{errors.numIdentificacion.message}</p>
          )}

          {/*Dirección*/}
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            placeholder="Dirección"
            {...register("direccion", { required: true, maxLength: 200 })}
          />

          {/*Fecha de nacimiento*/}
          <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
          <input
            type="date"
            {...register("fechaNacimiento", { required: true })}
          />

          {/*Correo electrónico*/}
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />

          {/*Teléfono*/}
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono"
            {...register("telefono", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />

          {/*Compañía de seguro dental*/}
          <label htmlFor="companiaSeguro">Compañía de seguro dental:</label>
          <select {...register("companiaSeguro", { required: true })}>
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

          {companiaSeguro && (companiaSeguro != "no") && (
            <input
              type="text"
              placeholder="123456789123"
              {...register("numCompaniaSeguro", {
                required: true,
                pattern: numCompaniaSeguro[companiaSeguro],
              })}
            />
          )}

          <input type="submit" placeholder="Guardar" />
        </form>
      </div>
    </section>
  );
}

export default MisDatos;