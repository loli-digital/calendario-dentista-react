import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth(){

    const { user, loading } = useContext(AuthContext);

    // Mostrar si está cargando
    if(loading){
        return (<div className="text-center">Cargando...</div>);
    }

    // Si NO hay usuario logueado, redirige a la página para iniciar sesión en Auth
    if(!user){
        return (
            <Navigate to="/auth/login" replace />
        );
    }

    // Si el user sí está logueado, aparecen las rutas hijas, el Dashboard
    return <Outlet />;
}

export default RequireAuth;