import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookiesBanner from './components/CookiesBanner';

import { Routes, Route } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

import { lazy, Suspense } from 'react';
import HomeSkeleton from './components/HomeSkeleton';
import MisCitasSkeleton from './components/MisCitasSkeleton';
import ReservarCitaSkeleton from './components/ReservarCitaSkeleton';

const Home = lazy(() => import('./pages/Home'));
const MisCitasHome = lazy(() => import('./pages/mis-citas/MisCitasHome'));
const ReservarCita = lazy(() => import('./pages/ReservarCita'));
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'));


function App() {

  return (
    <>
      <CookiesBanner />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<HomeSkeleton />}>
              <Home />
            </Suspense>
          } />
          <Route path="/mis-citas/MisCitasHome" element={
            <Suspense fallback={<MisCitasSkeleton />}>
              <MisCitasHome />
            </Suspense>
          } />
          <Route path="/reserva" element={
            <Suspense fallback={<ReservarCitaSkeleton />}>
              <ReservarCita />
            </Suspense>
          } />
          <Route path="/privacidad" element={
            <Suspense fallback={<div className="text-center py-10">Cargando política de privacidad...</div>}>
              <PoliticaPrivacidad />
            </Suspense>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
