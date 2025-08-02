import React from 'react';
import './App.css';
import Home from './pages/Home';
import Result from './pages/Result'; 
import BuyCredit from './pages/BuyCredit';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';

const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 
    min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#a5b4fc]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} /> 
        <Route path='/buy' element={<BuyCredit />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
