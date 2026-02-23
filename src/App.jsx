import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

import { Routes, Route } from 'react-router-dom';

//import MisCitas from './pages/MisCitas';
//import ReservaCita from './pages/ReservaCita';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/mis-citas" element={<MisCitas />} />*/}
        {/*<Route path="/reserva" element={<ReservaCita />} />*/}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
