import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { Routes, Route } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

import { lazy, Suspense } from 'react';
import HomeSkeleton from './components/HomeSkeleton';
import MisCitasSkeleton from './components/MisCitasSkeleton';
import ReservarCitaSkeleton from './components/ReservarCitaSkeleton';

const Home = lazy(() => import('./pages/Home'));
const MisCitas = lazy(() => import('./pages/MisCitas'));
const ReservarCita = lazy(() => import('./pages/ReservarCita'));


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<HomeSkeleton />}>
            <Home />
          </Suspense>
      } />
        <Route path="/mis-citas" element={
          <Suspense fallback={<MisCitasSkeleton />}>
            <MisCitas />
          </Suspense>
      } />
        <Route path="/reserva" element={
          <Suspense fallback={<ReservarCitaSkeleton />}>
            <ReservarCita />
          </Suspense>
      } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
