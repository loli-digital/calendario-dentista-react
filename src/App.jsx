import "./App.css";
import { Navbar } from "@/layout";
import { Footer } from "@/layout";
import { DashboardLayout } from "@/layout";

import { Routes, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { lazy, Suspense } from "react";
import { HomeSkeleton } from "@/components";
import { MisCitasSkeleton } from "@/components";
import { ReservarCitaSkeleton } from "@/components";
import { CookiesBanner } from "@/components";

const Home = lazy(() => import("./pages/Home/Home"));
const MisCitasHome = lazy(() => import("./pages/mis-citas/MisCitasHome"));
const MisCitasTelefono = lazy(
  () => import("./pages/mis-citas/MisCitasTelefono"),
);
const MisCitasLogin = lazy(() => import("./pages/mis-citas/MisCitasLogin"));
const MisCitasRegistroUser = lazy(
  () => import("./pages/mis-citas/MisCitasRegistroUser"),
);
const ReservarCita = lazy(() => import("./pages/Reservar-Cita/ReservarCita"));
const PoliticaPrivacidad = lazy(
  () => import("./pages/Politica-Privacidad/PoliticaPrivacidad"),
);
const DashboardMisDatos = lazy(() => import("./pages/Dashboard/MisDatos.jsx"));
const DashboardMisCitas = lazy(() => import("./pages/Dashboard/MisCitas.jsx"));
const DashboardMisFacturas = lazy(
  () => import("./pages/Dashboard/MisFacturas.jsx"),
);
const DashboardAjustes = lazy(() => import("./pages/Dashboard/Ajustes.jsx"));

function App() {
  return (
    <>
      <CookiesBanner />
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/mis-citas"
            element={
              <Suspense fallback={<MisCitasSkeleton />}>
                <MisCitasHome />
              </Suspense>
            }
          />
          <Route
            path="/mis-citas/telefono"
            element={
              <Suspense fallback={<MisCitasSkeleton />}>
                <MisCitasTelefono />
              </Suspense>
            }
          />
          <Route
            path="/mis-citas/login"
            element={
              <Suspense fallback={<MisCitasSkeleton />}>
                <MisCitasLogin />
              </Suspense>
            }
          />
          <Route
            path="/mis-citas/nueva-cuenta"
            element={
              <Suspense fallback={<MisCitasSkeleton />}>
                <MisCitasRegistroUser />
              </Suspense>
            }
          />
          <Route
            path="/reservar-cita"
            element={
              <Suspense fallback={<ReservarCitaSkeleton />}>
                <ReservarCita />
              </Suspense>
            }
          />
          <Route
            path="/privacidad"
            element={
              <Suspense
                fallback={
                  <div className="text-center py-10">
                    Cargando política de privacidad...
                  </div>
                }
              >
                <PoliticaPrivacidad />
              </Suspense>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Suspense
                fallback={
                  <div className="text-center">Cargando dashboard...</div>
                }
              >
                <DashboardLayout />
              </Suspense>
            }
          >
            {/* Ruta por defecto para dashboard */}
            <Route
              index
              element={
                <Suspense
                  fallback={
                    <div className="text-center">Cargando mis datos...</div>
                  }
                >
                  <DashboardMisDatos />
                </Suspense>
              }
            />
            <Route
              path="mis-datos"
              element={
                <Suspense
                  fallback={
                    <div className="text-center">Cargando mis datos...</div>
                  }
                >
                  <DashboardMisDatos />
                </Suspense>
              }
            />
            <Route
              path="mis-citas"
              element={
                <Suspense
                  fallback={
                    <div className="text-center">Cargando mis citas...</div>
                  }
                >
                  <DashboardMisCitas />
                </Suspense>
              }
            />
            <Route
              path="mis-facturas"
              element={
                <Suspense
                  fallback={
                    <div className="text-center">Cargando mis facturas...</div>
                  }
                >
                  <DashboardMisFacturas />
                </Suspense>
              }
            />
            <Route
              path="ajustes"
              element={
                <Suspense
                  fallback={
                    <div className="text-center">Cargando dashboard...</div>
                  }
                >
                  <DashboardAjustes />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
