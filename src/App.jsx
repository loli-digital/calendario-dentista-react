import "./App.css";
import { Navbar } from "./layout/index";
import { Footer } from "./layout/index";
import { CookiesBanner } from "./components";

import { Routes, Route } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { lazy, Suspense } from "react";
import { HomeSkeleton } from "@/components";
import { MisCitasSkeleton } from "@/components";
import { ReservarCitaSkeleton } from "@/components";

const Home = lazy(() => import("./pages/Home/Home"));
const MisCitasHome = lazy(() => import("./pages/mis-citas/MisCitasHome"));
const MisCitasTelefono = lazy(
  () => import("./pages/mis-citas/MisCitasTelefono"),
);
const MisCitasLogin = lazy(() => import("./pages/mis-citas/MisCitasLogin"));
const MisCitasRegistroUser = lazy(
  () => import("./pages/mis-citas/MisCitasRegistroUser"),
);
const ReservarCita = lazy(() => import("./pages/ReservarCita"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));

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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
