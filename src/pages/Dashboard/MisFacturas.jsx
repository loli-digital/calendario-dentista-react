import { useState, useEffect } from "react";
import { facturas } from "@/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

function MisFacturas() {
  const [facturasList, setFacturasList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga
    setTimeout(() => {
      setFacturasList(facturas);
      setLoading(false);
    }, 300);
  }, []);

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
    <section className="w-full p-10 flex flex-col justify-center items-center">
      <div className="w-full overflow-auto hidden md:block text-center">
        {/* Tabla para Desktop */}
        <table className="w-3xl mx-auto pt-10 flex flex-col justify-start gap-1">
          <thead>
            <tr className="p-3 flex justify-around justify-items-center items-center gap-3 text-cyan-800 border-2 border-cyan-700 rounded-sm shadow-[0_0_5px] shadow-cyan-700">
              <th className="w-30">Nº</th>
              <th className="w-30">Fecha</th>
              <th className="w-30">Tratamiento</th>
              <th className="w-30">Diente</th>
              <th className="w-30">Importe</th>
              <th className="w-30">Total</th>
              <th className="w-30">Estado</th>
              <th className="w-30">Descargar</th>
            </tr>
          </thead>
          <tbody>
            {facturasList.map((factura, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-cyan-50'} p-3 flex justify-around justify-items-center items-center gap-3 border-b-2 border-b-cyan-600`}
              >
                <td className="w-30">
                  {factura.invoiceNumber}
                </td>
                <td className="w-30">{factura.date}</td>
                <td className="w-30">
                  {factura.description}
                </td>
                <td className="w-30">
                  {factura.tooth || "—"}
                </td>
                <td className="w-30">{factura.price}</td>
                <td className="w-30">{factura.total}</td>
                <td className={`w-30 p-1 rounded-sm border-2 font-semibold ${factura.paid ? "bg-green-600 border-green-700 text-green-50" : "bg-yellow-300 border-yellow-500 text-yellow-800"}`}>
                  {factura.paid ? "Pagada" : "Pendiente"}
                </td>
                <a
                  href={factura.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-30"
                >
                  <FontAwesomeIcon
                    icon={faFileArrowDown}
                    className="text-cyan-800"
                  />
                </a>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla para móvil */}
      <div className="w-full flex flex-col gap-10 md:hidden">
        {facturasList.map((factura, index) => (
          <div
            key={index}
            className="p-4 flex flex-col justify-start gap-2 rounded-sm border-2 border-cyan-700 shadow-[0_0_5px] shadow-cyan-700 bg-white"
          >
            <p>
              <span className="font-bold text-cyan-700">Nº:</span>{" "}
              {factura.invoiceNumber}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Fecha:</span>{" "}
              {factura.date}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Tratamiento:</span>{" "}
              {factura.description}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Diente:</span>{" "}
              {factura.tooth || "—"}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Importe:</span>{" "}
              {factura.price}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Total:</span>{" "}
              {factura.total}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Estado: </span>
              <span
                className={`p-1 rounded-sm border-2 font-semibold ${factura.paid ? "bg-green-600 border-green-700 text-green-50" : "bg-yellow-300 border-yellow-500 text-yellow-800"}`}
              >
                {factura.paid ? "Pagada" : "Pendiente"}
              </span>
            </p>
            <p>
              <span className="font-bold text-cyan-700">Descargar: </span>
              <a
                href={factura.file}
                target="_blank"
                rel="noopener noreferrer"
                className="w-24"
              >
                <FontAwesomeIcon
                  icon={faFileArrowDown}
                  className="text-cyan-800"
                />
              </a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MisFacturas;
