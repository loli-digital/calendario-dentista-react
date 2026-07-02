import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

function RedirectIfAuth(){

    const { user, loading } = useContext(AuthContext);

    // Mostrar si está cargando
    if(loading){
        return (<div className="text-center">Cargando...</div>);
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