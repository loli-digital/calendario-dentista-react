import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDays,
  faFileInvoiceDollar,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export function SidebarDashboard() {
  return (
    <div className="w-44 h-96">
      <nav className="aside">
        <NavLink
          to="/dashboard-mis-datos"
          className={({ isActive }) =>
            `aside__navlink ${isActive ? "bg-cyan-700 rounded-t-sm" : "hover:bg-cyan-800 hover:rounded-t-sm"}`
          }
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Mis datos
        </NavLink>
        <NavLink
          to="/dashboard-mis-citas"
          className={({ isActive }) =>
            `aside__navlink ${isActive ? "bg-cyan-700" : "hover:bg-cyan-800"}`
          }
        >
          <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
          Mis citas
        </NavLink>
        <NavLink
          to="/dashboard-mis-facturas"
          className={({ isActive }) =>
            `aside__navlink ${isActive ? "bg-cyan-700" : "hover:bg-cyan-800"}`
          }
        >
          <FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2" />
          Mis facturas
        </NavLink>
        <NavLink
          to="/dashboard-ajustes"
          className={({ isActive }) =>
            `aside__navlink ${isActive ? "bg-cyan-700" : "hover:bg-cyan-800 hover:rounded-b-sm"}`
          }
        >
          <FontAwesomeIcon icon={faGear} className="mr-2" />
          Ajustes
        </NavLink>
      </nav>
    </div>
  );
}
