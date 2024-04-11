import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Market from './components/Market.js';
import Signup from './components/Signup.js';
import Navbar from './components/Navbar.js';
import StockDetail from './components/StockDetail.js';
import { StockProvider } from './components/StockContext.js';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <StockProvider>
          <Routes>
            <Route exact="true" path='/' element={<Home />} />
            <Route exact="true" path='/login' element={<Login />} />
            <Route exact="true" path='/signup' element={<Signup />} />
            <Route exact="true" path='/market' element={<Market />} />
            <Route exact="true" path="/market/:index/:symbol" element={<StockDetail />} />
          </Routes>
        </StockProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
