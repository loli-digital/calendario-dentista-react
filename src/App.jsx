import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar, Footer, DashboardLayout } from "@/layout";

import { Routes, Route, Outlet } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { lazy, Suspense, useContext } from "react";

import {
  HomeSkeleton,
  AppointmentSkeleton,
  AuthSkeleton,
  CookiesBanner,
} from "@/components";

// Home
const Home = lazy(() => import("./pages/Home/Home"));

// Auth
const RedirectIfAuth = lazy(() => import("./router/RedirectIfAuth"));
const RequireAuth = lazy(() => import("./router/RequireAuth"));
const AuthHome = lazy(() => import("./pages/Auth/AuthHome"));
const AuthLogin = lazy(() => import("./pages/Auth/AuthLogin"));
const AuthPhoneNumber = lazy(() => import("./pages/Auth/AuthPhoneNumber"));
const AuthRegistroUser = lazy(() => import("./pages/Auth/AuthRegistroUser"));

// Reservar cita
const ReservarCita = lazy(() => import("./pages/Reservar-Cita/ReservarCita"));

// Política de privacidad
const PoliticaPrivacidad = lazy(
  () => import("./pages/Politica-Privacidad/PoliticaPrivacidad"),
);

// Dashboard
const DashboardMisDatos = lazy(() => import("./pages/Dashboard/MisDatos"));
const DashboardMisCitas = lazy(() => import("./pages/Dashboard/MisCitas"));
const DashboardMisFacturas = lazy(
  () => import("./pages/Dashboard/MisFacturas"),
);
const DashboardAjustes = lazy(() => import("./pages/Dashboard/Ajustes"));

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Cargando tu sesión...
      </div>
    );
  }

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

          {/* Auth, sólo se accede si el user NO está logueado */}
          <Route element={<RedirectIfAuth />}>
          {/* Outlet se usa para ver las rutas hijas. 
          Por ejemplo, al hacer click en Acceder a la cuenta personal, 
          redirigiría a AuthLogin */}
            <Route path="/auth" element={<Outlet />}>
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
                    <AuthPhoneNumber />
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
          </Route>

          {/* Reservar cita */}
          <Route
            path="/reservar-cita"
            element={
              <Suspense fallback={<AppointmentSkeleton />}>
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

          {/* Dashboard, sólo se accede si user está logueado */}
          <Route element={<RequireAuth />}>
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
                      <div className="text-center">
                        Cargando mis facturas...
                      </div>
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
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
