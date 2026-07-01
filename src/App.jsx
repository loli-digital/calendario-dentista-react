import "./App.css";
import { Navbar, Footer, DashboardLayout } from "@/layout";

import { Routes, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { lazy, Suspense } from "react";
import {
  HomeSkeleton,
  ReservarCitaSkeleton,
  AuthSkeleton,
  CookiesBanner,
} from "@/components";

// Home
const Home = lazy(() => import("./pages/Home/Home"));

// Auth
const AuthHome = lazy(() => import("./pages/Auth/AuthHome"));
const AuthLogin = lazy(() => import("./pages/Auth/AuthLogin.jsx"));
const AuthTelefono = lazy(() => import("./pages/Auth/AuthTelefono"));
const AuthRegistroUser = lazy(() => import("./pages/Auth/AuthRegistroUser"));

// Reservar cita
const ReservarCita = lazy(() => import("./pages/Reservar-Cita/ReservarCita"));

// Política de privacidad
const PoliticaPrivacidad = lazy(
  () => import("./pages/Politica-Privacidad/PoliticaPrivacidad"),
);

// Dashboard
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
          {/* Home */}
          <Route
            path="/"
            element={
              <Suspense fallback={<HomeSkeleton />}>
                <Home />
              </Suspense>
            }
          />

          {/* Auth */}
          <Route
            path="/auth"
            element={
                <AuthHome />
            }
          >
            {/* Ruta por defecto para Auth */}
            <Route
              index
              element={
                <Suspense fallback={<AuthSkeleton />}>
                  <AuthHome />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<AuthSkeleton />}>
                  <AuthLogin />
                </Suspense>
              }
            />
            <Route
              path="telefono"
              element={
                <Suspense fallback={<AuthSkeleton />}>
                  <AuthTelefono />
                </Suspense>
              }
            />
            <Route
              path="nueva-cuenta"
              element={
                <Suspense fallback={<AuthSkeleton />}>
                  <AuthRegistroUser />
                </Suspense>
              }
            />
          </Route>

          {/* Reservar cita */}
          <Route
            path="/reservar-cita"
            element={
              <Suspense fallback={<ReservarCitaSkeleton />}>
                <ReservarCita />
              </Suspense>
            }
          />

          {/* Privacidad */}
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

          {/* Dashboard */}
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
            {/* Ruta por defecto para Dashboard */}
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
