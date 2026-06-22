{/* Es el Home del Dashboard
    Aquí se muestran
    las pestañas de mis citas, mis datos, eliminar cuenta, ajustes, etc */}

import MisDatos from "./sectionsDashboard/MisDatos";    

function Dashboard() {

    return(
        <div className="w-full bg-cyan-100">
            <p>Te damos la bienvenida a tu espacio</p>

            <div className="flex flex-col justify-start items-center">
                <MisDatos />
            </div>
        </div>
    );
}

export default Dashboard;