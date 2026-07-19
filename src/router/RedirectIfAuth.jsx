import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

function RedirectIfAuth(){

    const { user, loading } = useContext(AuthContext);

    // Mostrar si está cargando
    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
                Cargando tu sesión...
            </div>
        );
    }

    // Si el user se ha logueado, redirigir al dashboard
    if(user){
        return (
            <Navigate to="/dashboard" replace />
        );
    }

    // Si no está logueado, redirige a las rutas hijas, para iniciar sesión con Auth
    return <Outlet />;
}

export default RedirectIfAuth;