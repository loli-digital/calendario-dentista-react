import { auth, db } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useForm, useWatch } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

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
    setValue,
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

  const documentErrorMessages = {
    dni: "El DNI debe tener 8 números y una letra final",
    nie: "El NIE debe empezar por X, Y o Z y terminar con una letra",
    passport: "El pasaporte debe tener 3 letras y 6 números",
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
                {...register("name", {
                  required: "El nombre es obligatorio",
                  setValueAs: (value) => value.trim(),
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 80,
                    message: "El nombre no puede superar los 80 caracteres",
                  },
                })}
                className="form__input"
              />

              {errors.name && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.name.message}
                </span>
              )}

              {/*Apellido/s*/}
              <label htmlFor="lastName" className="form__label">
                Apellido/s:
              </label>
              <input
                type="text"
                placeholder="Escribe tu/s apellido/s"
                {...register("lastName", {
                  required: "El apellido es obligatorio",
                  minLength: {
                    value: 3,
                    message: "El apellido debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "El apellido no puede superar los 100 caracteres",
                  },
                })}
                className="form__input"
              />

              {errors.lastName && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.lastName.message}
                </span>
              )}

              {/*Fecha de nacimiento*/}
              <label htmlFor="dateOfBirth" className="form__label">
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "La fecha de nacimiento es obligatoria",
                  validate: (value) => {
                    if (!value) return "La fecha de nacimiento es obligatoria";

                    const selectedDate = new Date(value + "T00:00:00");
                    const today = new Date();

                    if (Number.isNaN(selectedDate.getTime())) {
                      return "La fecha no es válida";
                    }

                    if (selectedDate > today) {
                      return "La fecha no puede ser futura";
                    }

                    const age =
                      today.getFullYear() - selectedDate.getFullYear();
                    const monthDiff =
                      today.getMonth() - selectedDate.getMonth();
                    const dayDiff = today.getDate() - selectedDate.getDate();

                    const realAge =
                      monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)
                        ? age - 1
                        : age;

                    if (realAge < 18) {
                      return "Debes ser mayor de 18 años";
                    }

                    if (selectedDate.getFullYear() < 1900) {
                      return "La fecha de nacimiento no es válida";
                    }

                    return true;
                  },
                })}
                className="form__input"
              />
              {errors.dateOfBirth && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.dateOfBirth.message}
                </span>
              )}

              {/*Dirección*/}
              <label htmlFor="address" className="form__label">
                Dirección:
              </label>
              <input
                type="text"
                placeholder="Escribe tu dirección"
                {...register("address", {
                  required: "La dirección es obligatoria",
                  minLength: {
                    value: 5,
                    message: "La dirección debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 200,
                    message: "La dirección no puede superar los 200 caracteres",
                  },
                })}
                className="form__input"
              />
              {errors.address && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.address.message}
                </span>
              )}

              {/*Ciudad*/}
              <label htmlFor="city" className="form__label">
                Ciudad:
              </label>
              <select
                name="city"
                {...register("city", {
                  required: "La ciudad es obligatoria",
                })}
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
              {errors.city && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.city.message}
                </span>
              )}

              {/* Código postal */}
              <label htmlFor="zipCode" className="form__label">
                Código postal:
              </label>
              <input
                type="text"
                placeholder="Escribe tu código postal"
                {...register("zipCode", {
                  required: "El código postal es obligatorio",
                  setValueAs: (value) => value.trim(),
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: "El código postal debe tener 5 números",
                  },
                })}
                className="form__input"
              />

              {errors.zipCode && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.zipCode.message}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              {/*Tipo de identificación*/}
              <label htmlFor="identificationType" className="form__label">
                Tipo de identificación:
              </label>
              <select
                {...register("identificationType", {
                  required: "El tipo de identificación es obligatorio",
                })}
                className="form__input"
              >
                <option value="">Seleccionar</option>
                <option value="dni">DNI</option>
                <option value="nie">NIE</option>
                <option value="passport">Pasaporte</option>
              </select>

              {errors.identificationType && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.identificationType.message}
                </span>
              )}

              {identificationType && (
                <input
                  type="text"
                  placeholder={placeholderIdentification[identificationType]}
                  {...register("identificationNumber", {
                    required: "El número de identificación es obligatorio",
                    validate: (value) => {
                      if (!value) {
                        return "El número de identificación es obligatorio";
                      }

                      const normalized = value.trim().toUpperCase();
                      const pattern = {
                        dni: /^[0-9]{8}[A-Z]$/,
                        nie: /^[XYZ][0-9]{7}[A-Z]$/,
                        passport: /^[A-Z]{3}[0-9]{6}$/,
                      }[identificationType];

                      if (!pattern || !pattern.test(normalized)) {
                        return documentErrorMessages[identificationType];
                      }

                      return true;
                    },
                  })}
                  onChange={(event) => {
                    const nextValue = event.target.value.toUpperCase();
                    setValue("identificationNumber", nextValue, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  className="form__input"
                />
              )}

              {errors.identificationNumber && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.identificationNumber.message}
                </span>
              )}

              {/*Correo electrónico*/}
              <label htmlFor="email" className="form__label">
                Correo electrónico:
              </label>
              <input
                type="email"
                {...register("email", {
                  setValueAs: (value) => value.trim(),
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Email no válido",
                  },
                })}
                className="form__input"
              />

              {errors.email && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.email.message}
                </span>
              )}

              {/*Teléfono*/}
              <label htmlFor="phoneNumber" className="form__label">
                Teléfono:
              </label>
              <input
                type="tel"
                placeholder="Escribe tu teléfono"
                {...register("phoneNumber", {
                  required: "El teléfono es obligatorio",
                  setValueAs: (value) => value.trim(),
                  pattern: {
                    value: /^[0-9]{9,12}$/,
                    message: "El teléfono debe tener entre 9 y 12 dígitos",
                  },
                })}
                className="form__input"
              />
              {errors.phoneNumber && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.phoneNumber.message}
                </span>
              )}

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
                {...register("insuranceCompany", {
                  required: "La elección de compañía de seguro es obligatoria",
                })}
                className="form__input"
              >
                <option value="">Seleccionar</option>
                <option value="no">No tengo compañía de seguro dental</option>
                <option value="asisa">ASISA</option>
                <option value="sanitas">SANITAS</option>
                <option value="adeslas">ADESLAS</option>
                <option value="mapfre">MAPFRE</option>
                <option value="dkv">DKV</option>
              </select>

              {errors.insuranceCompany && (
                <span className="text-red-800">
                  <FontAwesomeIcon icon={faSquareXmark} />
                  {errors.insuranceCompany.message}
                </span>
              )}

              {insuranceCompany && insuranceCompany != "no" && (
                <input
                  type="text"
                  placeholder="123456789123"
                  {...register("insuranceCompanyNumber", {
                    required:
                      "Este campo es obligatorio si eliges tener compañía de seguro",
                    setValueAs: (value) => value.trim(),
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
              {userData.identificationType.toUpperCase()}{" "}
              {userData.identificationNumber.toUpperCase()}
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
              {userData.insuranceCompany.toUpperCase()}{" "}
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
