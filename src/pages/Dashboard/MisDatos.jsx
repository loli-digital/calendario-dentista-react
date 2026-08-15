import { auth, db } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useForm, useWatch } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components";
import { AuthContext } from "@/context/AuthContext";

function MisDatos() {
  // Lógica para cuando carga la página
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { refreshUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      dateOfBirth: "",
      address: "",
      city: "",
      zipCode: "",
      identificationType: "",
      identificationNumber: "",
      phoneNumber: "",
      email: "",
      allergies: "",
      insuranceCompany: "",
      insuranceCompanyNumber: "",
    },
  });

  // Estado para saber si el user tiene datos o no
  const [hasData, setHasData] = useState(null);
  // Estado para los datos del user
  const [userData, setUserData] = useState(null);

  /* useWatch se utiliza para que al hacer click en uno de las opciones
  del select, como el tipo de identificación, si ha elegido DNI, NIE o Pasaporte,
  se habra un input para escribir los números y letras de éste.
  Lo mismo con la compañía de seguro, si ha elegido que SÍ tiene una compañía,
  entonces aparece el input para escribir los números y letras de ésta.
  */
  const identificationType = useWatch({ control, name: "identificationType" });
  const insuranceCompany = useWatch({ control, name: "insuranceCompany" });

  const placeholderIdentification = {
    dni: "12345678A",
    nie: "X1234567Y",
    passport: "ABC123456",
  };

  const identificationPattern = {
    dni: /^[0-9]{8}[A-Z]$/,
    nie: /^[XYZ][0-9]{7}[A-Z]$/,
    passport: /^[A-Z]{3}[0-9]{6}$/,
  };

  const insuranceCompanyNumber = {
    asisa: /^[0-9]{12,15}$/,
    sanitas: /^[0-9]{9,12}$/,
    adeslas: /^[0-9]{10,12}$/,
    mapfre: /^[0-9]{10,12}$/,
    dkv: /^[0-9]{10,12}$/,
  };

  // Para que se muestre la fecha en día, mes y año
  const formattedDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // Lógica para guardar los datos al hacer click en "Guardar"
  const onSubmit = async (data) => {
    setIsSaving(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No hay ningún usuario autenticado");
      }

      // Lógica para mostrar el nombre del user al iniciar sesión
      const completeName = [data.name, data.lastName]
        .filter(Boolean)
        .map((valor) => valor.trim())
        .join(" ")
        .trim();

      if (completeName) {
        await updateProfile(user, {
          displayName: completeName,
        });

        await refreshUser();
      }

      const dataToSave = {
        ...data,
        displayName: completeName,
      };

      await setDoc(doc(db, "users", user.uid), dataToSave);
      setUserData(dataToSave);
      setHasData(true);
    } finally {
      setIsSaving(false);
    }
  };

  /* Lógica para que el email siempre aparezca al crear una cuenta, 
 independientemente de si ha rellenado los datos o no */
  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      try {
        // Obtener el user de Firebase Auth
        const user = auth.currentUser;

        // Si no hay user registrado, no se hace nada
        if (!user) {
          if (isMounted) {
            setHasData(false);
          }
          return;
        }

        // Cargar los datos de Firestone
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        /* Si es la primera vez que entra el user después del registro,
        que se vea la pantalla del formulario para que rellene sus datos*/
        if (!docSnap.exists()) {
          const newData = {
            name: "",
            lastName: "",
            dateOfBirth: "",
            address: "",
            city: "",
            zipCode: "",
            identificationType: "",
            identificationNumber: "",
            // para que se vea el email siempre, ya que se ha registrado con él
            email: user.email,
            phoneNumber: "",
            allergies: "",
            insuranceCompany: "",
            insuranceCompanyNumber: "",
          };

          if (isMounted) {
            reset(newData);
            setUserData(newData);
            setHasData(false);
          }
        } else {
          // Sí ha rellenado los datos
          const existingData = {
            email: user.email,
            ...docSnap.data(),
          };

          if (isMounted) {
            reset(existingData);
            setUserData(existingData);
            setHasData(true);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [reset]);

  if (loading) {
    return (
      <section className="w-full h-full p-10 flex justify-center items-center">
        <p className="text-center">Cargando datos...</p>
      </section>
    );
  }

  return (
    <section className="w-full h-full p-3 lg:p-10 flex justify-center">
      {!hasData ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-auto mx-auto flex flex-col flex-nowrap justify-center items-stretch gap-3"
        >
          <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-5">
            <div className="w-full flex flex-col gap-2">
              {/*Nombre*/}
              <label htmlFor="name" className="form__label">
                Nombre:
              </label>
              <input
                type="text"
                placeholder="Escribe tu nombre"
                {...register("name", { required: true, maxLength: 80 })}
                className="form__input"
              />

              {/*Apellido/s*/}
              <label htmlFor="lastName" className="form__label">
                Apellido/s:
              </label>
              <input
                type="text"
                placeholder="Escribe tu/s apellido/s"
                {...register("lastName", { required: true, maxLength: 100 })}
                className="form__input"
              />

              {/*Fecha de nacimiento*/}
              <label htmlFor="dateOfBirth" className="form__label">
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                {...register("dateOfBirth", { required: true })}
                className="form__input"
              />

              {/*Dirección*/}
              <label htmlFor="address" className="form__label">
                Dirección:
              </label>
              <input
                type="text"
                placeholder="Escribe tu dirección"
                {...register("address", { required: true, maxLength: 200 })}
                className="form__input"
              />

              {/*Ciudad*/}
              <label htmlFor="city" className="form__label">
                Ciudad:
              </label>
              <select
                name="city"
                {...register("city", { required: true })}
                className="form__input"
              >
                <option value="">Selecciona tu ciudad</option>
                <option value="A Coruña">A Coruña</option>
                <option value="Albacete">Albacete</option>
                <option value="Almería">Almería</option>
                <option value="Alicante">Alicante</option>
                <option value="Ávila">Ávila</option>
                <option value="Badajoz">Badajoz</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Bilbao">Bilbao</option>
                <option value="Burgos">Burgos</option>
                <option value="Cáceres">Cáceres</option>
                <option value="Cádiz">Cádiz</option>
                <option value="Castellón de la Plana">
                  Castellón de la Plana
                </option>
                <option value="Ceuta">Ceuta</option>
                <option value="Ciudad Real">Ciudad Real</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Cuenca">Cuenca</option>
                <option value="Girona">Girona</option>
                <option value="Gijón">Gijón</option>
                <option value="Granada">Granada</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="Huelva">Huelva</option>
                <option value="Huesca">Huesca</option>
                <option value="Jaén">Jaén</option>
                <option value="Las Palmas de Gran Canaria">
                  Las Palmas de Gran Canaria
                </option>
                <option value="León">León</option>
                <option value="Logroño">Logroño</option>
                <option value="Lleida">Lleida</option>
                <option value="Lugo">Lugo</option>
                <option value="Madrid">Madrid</option>
                <option value="Málaga">Málaga</option>
                <option value="Melilla">Melilla</option>
                <option value="Murcia">Murcia</option>
                <option value="Ourense">Ourense</option>
                <option value="Oviedo">Oviedo</option>
                <option value="Palencia">Palencia</option>
                <option value="Palma">Palma</option>
                <option value="Pamplona">Pamplona</option>
                <option value="Pontevedra">Pontevedra</option>
                <option value="Salamanca">Salamanca</option>
                <option value="San Sebastián">San Sebastián</option>
                <option value="Santa Cruz de Tenerife">
                  Santa Cruz de Tenerife
                </option>
                <option value="Santander">Santander</option>
                <option value="Segovia">Segovia</option>
                <option value="Sevilla">Sevilla</option>
                <option value="Soria">Soria</option>
                <option value="Tarragona">Tarragona</option>
                <option value="Teruel">Teruel</option>
                <option value="Toledo">Toledo</option>
                <option value="Valencia">Valencia</option>
                <option value="Valladolid">Valladolid</option>
                <option value="Vigo">Vigo</option>
                <option value="Vitoria-Gasteiz">Vitoria-Gasteiz</option>
                <option value="Zamora">Zamora</option>
                <option value="Zaragoza">Zaragoza</option>
              </select>

              {/* Código postal */}
              <label htmlFor="zipCode" className="form__label">
                Código postal:
              </label>
              <input
                type="text"
                placeholder="Escribe tu código postal"
                {...register("zipCode", { required: true })}
                className="form__input"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              {/*Tipo de identificación*/}
              <label htmlFor="identificationType" className="form__label">
                Tipo de identificación:
              </label>
              <select
                {...register("identificationType", { required: true })}
                className="form__input"
              >
                <option value="" selected>
                  Seleccionar
                </option>
                <option value="dni">DNI</option>
                <option value="nie">NIE</option>
                <option value="passport">Pasaporte</option>
              </select>

              {errors.identificationType && (
                <p className="text-center">
                  {errors.identificationType.message}
                </p>
              )}

              {identificationType && (
                <input
                  type="text"
                  placeholder={placeholderIdentification[identificationType]}
                  {...register("identificationNumber", {
                    required: true,
                    pattern: identificationPattern[identificationType],
                  })}
                  className="form__input"
                />
              )}

              {errors.identificationNumber && (
                <p className="text-center">
                  {errors.identificationNumber.message}
                </p>
              )}

              {/*Correo electrónico*/}
              <label htmlFor="email" className="form__label">
                Correo electrónico:
              </label>
              <input
                type="email"
                {...register("email")}
                className="form__input"
              />

              {/*Teléfono*/}
              <label htmlFor="phoneNumber" className="form__label">
                Teléfono:
              </label>
              <input
                type="tel"
                placeholder="Escribe tu teléfono"
                {...register("phoneNumber", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
                className="form__input"
              />

              {/* Alergias */}
              <label htmlFor="allergies" className="form__label">
                Alergias:
              </label>
              <textarea
                name="allergies"
                id="allergies"
                rows="2"
                placeholder="Escribe si tienes alguna alergia"
                {...register("allergies")}
                className="form__input"
              ></textarea>

              {/*Compañía de seguro dental*/}
              <label htmlFor="insuranceCompany" className="form__label">
                Compañía de seguro dental:
              </label>
              <select
                {...register("insuranceCompany", { required: true })}
                className="form__input"
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

              {errors.insuranceCompany && <p>{errors.insuranceCompany.message}</p>}

              {insuranceCompany && insuranceCompany != "no" && (
                <input
                  type="text"
                  placeholder="123456789123"
                  {...register("insuranceCompanyNumber", {
                    required: true,
                    pattern: insuranceCompanyNumber[insuranceCompany],
                  })}
                  className="form__input"
                />
              )}
            </div>
          </div>

          <input
            type="submit"
            value={isSaving ? "Guardando..." : "Guardar"}
            disabled={isSaving}
            className={`w-40 mx-auto mt-4 bg-cyan-700 text-white p-3 lg:p-4 cursor-pointer rounded-sm shadow-[0_0_5px_black] transition-colors duration-200 ease-in hover:bg-cyan-600 ${isSaving ? "bg-cyan-400 cursor-not-allowed" : ""}`}
          />
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center gap-7">
          <div className="form__container--data-show">
            <p>
              <span className="form__p--mis-datos">Nombre:</span>{" "}
              {userData.name}
            </p>
            <p>
              <span className="form__p--mis-datos">Apellido/s:</span>{" "}
              {userData.lastName}
            </p>
            <p>
              <span className="form__p--mis-datos">Fecha de nacimiento:</span>{" "}
              {formattedDate(userData.dateOfBirth)}
            </p>
            <p>
              <span className="form__p--mis-datos">Dirección:</span>{" "}
              {userData.address}
            </p>
            <p>
              <span className="form__p--mis-datos">Ciudad:</span>{" "}
              {userData.city}
            </p>
            <p>
              <span className="form__p--mis-datos">Código postal:</span>{" "}
              {userData.zipCode}
            </p>
            <p>
              <span className="form__p--mis-datos">
                Tipo de identificación:
              </span>{" "}
              {userData.identificationType}{" "}
              {userData.identificationNumber}
            </p>
            <p>
              <span className="form__p--mis-datos">Correo electrónico:</span>{" "}
              {userData.email}
            </p>
            <p>
              <span className="form__p--mis-datos">Teléfono:</span>{" "}
              {userData.phoneNumber}
            </p>
            <p>
              <span className="form__p--mis-datos">Alergias:</span>{" "}
              {userData.allergies}
            </p>
            <p>
              <span className="form__p--mis-datos">
                Compañía de seguro dental:
              </span>{" "}
              {userData.insuranceCompany}{" "}
              {userData.insuranceCompanyNumber}
            </p>
          </div>

          {/* Botón para editar datos */}
          <Button onClick={() => setHasData(false)} className="w-40 mx-auto">
            Editar datos
          </Button>
        </div>
      )}
    </section>
  );
}

export default MisDatos;
