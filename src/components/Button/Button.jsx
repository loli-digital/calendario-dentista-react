import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";

export const Button = () => {
  return (
    <Link
      to="/reservar-cita"
      className="bg-cyan-700 text-white p-3 rounded-sm shadow-[0_0_5px_black] z-50 transition-all duration-200 ease-in-out hover:bg-cyan-800 hover:shadow-[0_0_5px_#fff]"
    >
      Reserva tu cita ya
      <span className="ml-1">
        <FontAwesomeIcon icon={faCalendarDays} color="#fff"/>
      </span>
    </Link>
  );
};
