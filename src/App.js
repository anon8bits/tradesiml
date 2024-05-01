import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Market from './components/Market.js';
import Signup from './components/Signup.js';
import Navbar from './components/Navbar.js';
import StockDetail from './components/StockDetail.js';
import Order from './components/Order.js';
import { OrderProvider } from './components/context/OrderContext.js';

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
          <OrderProvider>
            <Routes>
              <Route exact="true" path='/' element={<Home />} />
              <Route exact="true" path='/login' element={<Login />} />
              <Route exact="true" path='/signup' element={<Signup />} />
              <Route exact="true" path='/market' element={<Market />} />
              <Route exact="true" path="/market/:symbol" element={<StockDetail />} />
              <Route exact="true" path='/order' element={< Order/>}  />
            </Routes>
          </OrderProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
