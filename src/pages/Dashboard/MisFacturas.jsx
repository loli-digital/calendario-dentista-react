import { useState, useEffect } from "react";
import { invoices } from "@/data";
import { Button } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function MisFacturas() {
  const [originalInvoices, setOriginalInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    dateStart: "",
    dateEnd: "",
    invoiceNumber: "",
    tratamiento: "",
    invoiceState: "",
  });

  useEffect(() => {
    // Simulación de carga
    setTimeout(() => {
      setOriginalInvoices(invoices);
      setFilteredInvoices(invoices);
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

  if (invoices.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-center">No tienes facturas disponibles</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e && e.preventDefault();
    const results = originalInvoices.filter((f) => {
      // Número de factura
      if (
        filters.invoiceNumber &&
        !String(f.invoiceNumber).toLowerCase().includes(filters.invoiceNumber.toLowerCase())
      )
        return false;

      // Tratamiento
      if (
        filters.tratamiento &&
        !String(f.description).toLowerCase().includes(filters.tratamiento.toLowerCase())
      )
        return false;

      // Estado
      if (filters.invoiceState && filters.invoiceState !== "") {
        if (filters.invoiceState === "paid" && !f.paid) return false;
        if (filters.invoiceState === "pendant" && f.paid) return false;
      }

      // Fecha desde
      if (filters.dateStart) {
        const fDate = new Date(f.date);
        const start = new Date(filters.dateStart);
        if (isNaN(fDate) || fDate < start) return false;
      }

      // Fecha hasta
      if (filters.dateEnd) {
        const fDate = new Date(f.date);
        const end = new Date(filters.dateEnd);
        if (isNaN(fDate) || fDate > end) return false;
      }

      return true;
    });

    setFilteredInvoices(results);
  };

  const handleReset = () => {
    setFilters({ dateStart: "", dateEnd: "", invoiceNumber: "", tratamiento: "", invoiceState: "" });
    setFilteredInvoices(originalInvoices);
  };

  return (
    <section className="w-full p-3 lg:p-10 flex flex-col justify-center items-center gap-5">
      {/* Formulario para filtrar facturas */}
      <form
        action=""
        onSubmit={handleSearch}
        className="w-full p-3 flex flex-col md:justify-center md:items-center md:gap-4"
      >
        <div className="flex flex-col md:flex-row md:justify-center md:items-center space-y-1 md:space-y-0 md:space-x-1">
          <label htmlFor="date-start" className="form__label">
            Fecha desde
          </label>
          <input
            type="date"
            name="date-start"
            id="date-start"
            value={filters.dateStart}
            onChange={(e) => handleChange({ ...e, target: { name: "dateStart", value: e.target.value } })}
            className="form__input--invoice w-32 md:mr-3"
          />

          <label htmlFor="date-end" className="form__label">
            Fecha hasta
          </label>
          <input
            type="date"
            name="dateEnd"
            id="date-end"
            value={filters.dateEnd}
            onChange={(e) => handleChange({ ...e, target: { name: "dateEnd", value: e.target.value } })}
            className="form__input--invoice w-32 md:mr-3"
          />

          <label htmlFor="number-invoice" className="form__label">
            Número de factura
          </label>
          <input
            type="search"
            name="invoiceNumber"
            id="number-invoice"
            value={filters.invoiceNumber}
            onChange={(e) => handleChange({ ...e, target: { name: "invoiceNumber", value: e.target.value } })}
            className="form__input--invoice w-20"
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-center md:items-center space-y-1 md:space-y-0 md:space-x-1">
          <label htmlFor="tratamiento" className="form__label">
            Tratamiento
          </label>
          <select
            name="tratamiento"
            id="tratamiento"
            value={filters.tratamiento}
            onChange={(e) => handleChange({ ...e, target: { name: "tratamiento", value: e.target.value } })}
            className="form__input w-37 md:mr-4"
          >
            <option value="" selected>
              Seleccionar
            </option>
            <option value="limpieza">Limpieza</option>
            <option value="revisión">Revisión</option>
            <option value="ortodoncia">Ortodoncia</option>
            <option value="obturación">Obturación</option>
            <option value="estética dental">Estética dental</option>
            <option value="odontopediatría">Odontopediatría</option>
            <option value="prótesis">Prótesis</option>
          </select>

          <label htmlFor="invoice-state" className="form__label">
            Estado
          </label>
          <select
            name="invoice-state"
            id="invoice-state"
            value={filters.invoiceState}
            onChange={(e) => handleChange({ ...e, target: { name: "invoiceState", value: e.target.value } })}
            className="form__input w-29 md:mr-4"
          >
            <option value="">Seleccionar</option>
            <option value="all">Todas</option>
            <option value="paid">Pagadas</option>
            <option value="pendant">Pendientes</option>
          </select>

          <div className="flex gap-2 pt-3 lg:pt-0">
            <Button icon={faMagnifyingGlass} className="w-32" type="submit">
              Buscar
            </Button>
            <Button className="w-32" onClick={handleReset} type="button">
              Eliminar
            </Button>
          </div>
        </div>
      </form>
      {filteredInvoices.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center py-10">
          <p className="text-center">No hay facturas que coincidan con los criterios.</p>
        </div>
      ) : (
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
            {filteredInvoices.map((invoice, id) => (
              <tr
                key={invoice.id}
                className={`${id % 2 === 0 ? "bg-white" : "bg-cyan-50"} p-3 flex justify-around justify-items-center items-center gap-3 border-b-2 border-b-cyan-600`}
              >
                <td className="w-30">{invoice.invoiceNumber}</td>
                <td className="w-30">{invoice.date}</td>
                <td className="w-30">{invoice.description}</td>
                <td className="w-30">{invoice.tooth || "—"}</td>
                <td className="w-30">{invoice.price}</td>
                <td className="w-30">{invoice.total}</td>
                <td
                  className={`w-30 p-1 rounded-sm border-2 font-semibold ${invoice.paid ? "bg-green-600 border-green-700 text-green-50" : "bg-yellow-300 border-yellow-500 text-yellow-800"}`}
                >
                  {invoice.paid ? "Pagada" : "Pendiente"}
                </td>
                <a
                  href={invoice.file}
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
      )}

      {/* Tabla para móvil */}
      <div className="w-full flex flex-col gap-10 md:hidden">
        {filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 flex flex-col justify-start gap-2 rounded-sm border-2 border-cyan-700 shadow-[0_0_5px] shadow-cyan-700 bg-white"
          >
            <p>
              <span className="font-bold text-cyan-700">Nº:</span>{" "}
              {invoice.invoiceNumber}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Fecha:</span>{" "}
              {invoice.date}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Tratamiento:</span>{" "}
              {invoice.description}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Diente:</span>{" "}
              {invoice.tooth || "—"}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Importe:</span>{" "}
              {invoice.price}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Total:</span>{" "}
              {invoice.total}
            </p>
            <p>
              <span className="font-bold text-cyan-700">Estado: </span>
              <span
                className={`p-1 rounded-sm border-2 font-semibold ${invoice.paid ? "bg-green-600 border-green-700 text-green-50" : "bg-yellow-300 border-yellow-500 text-yellow-800"}`}
              >
                {invoice.paid ? "Pagada" : "Pendiente"}
              </span>
            </p>
            <p>
              <span className="font-bold text-cyan-700">Descargar: </span>
              <a
                href={invoice.file}
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
