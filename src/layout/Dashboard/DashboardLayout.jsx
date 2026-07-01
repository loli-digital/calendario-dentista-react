import { Outlet, useLocation } from "react-router-dom";
import { DecorativeShape } from "@/components";
import { SidebarDashboard } from "../../pages/Dashboard/SidebarDashboard";

export function DashboardLayout() {

  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      return "Mis datos";
    }
    if (location.pathname.includes("mis-datos")) return "Mis datos";
    if (location.pathname.includes("mis-citas")) return "Mis citas";
    if (location.pathname.includes("mis-facturas")) return "Mis facturas";
    if (location.pathname.includes("ajustes")) return "Ajustes";

    return "Mi espacio";
  };

  return (
    <div className="container__section">
      {/* Forma decorativa */}
      <DecorativeShape />

      <h1 className="title__section">{getTitle()}</h1>

      <section className="w-full lg:w-5xl h-auto pb-10 relative flex flex-nowrap justify-center lg:justify-start items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <SidebarDashboard />
        </aside>

        {/* Layout del dashboard */}
        <div className="w-auto lg:w-2xl h-full bg-cyan-50 rounded-sm shadow-[0_0_5px_black]">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
