import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Market from './components/Market.js';
import Signup from './components/Signup.js';
import Navbar from './components/Navbar.js';
import StockDetail from './components/StockDetail.js';
import Order from './components/Order.js';
import Profile from './components/Profile.js';
import NotFoundComponent from './components/Missing.js';
import { StockProvider } from './components/context/StockContext.js';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundComponent />} />
          <Route exact path="/market/:symbol" element={<StockDetail />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
