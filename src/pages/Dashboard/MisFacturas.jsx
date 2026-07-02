import { db } from "@/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function MisFacturas() {
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("MisFacturas montado");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      const ref = collection(db, "facturas", currentUser.uid, "lista");
      const snap = await getDocs(ref);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFacturas(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">Inicia sesión para ver tus facturas</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">Cargando facturas...</p>
      </div>
    );
  }

  if (facturas.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">No tienes facturas disponibles</p>
      </div>
    );
  }

  return (
    <section className="w-full h-full p-10 flex flex-col justify-center items-center">
      <ul>
        {facturas.map((factura) => (
          <li key={factura.id}>
            <p>
              <strong>Fecha: </strong>
              {factura.fecha}
            </p>
            <p>
              <strong>Importe: </strong>
              {factura.importe}
            </p>
            <p>
              <strong>Pagada: </strong>
              {factura.pagada}
            </p>
            <a href={factura.archivo} target="_blank" rel="noopener noreferrer">
              Descargar factura
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MisFacturas;
