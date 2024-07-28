import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home, Login, Market, StockDetail, Order, Profile, Portfolio, OrderDetails, NotFoundComponent, Navbar2, FAQ } from './components/index.js';
import { StockProvider } from './components/context/StockContext.js';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <StockProvider>
      <BrowserRouter>
        <Navbar2 />
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<NotFoundComponent />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/orderdetails/:status/:orderID" element={<OrderDetails />} />
          <Route path="/orderdetails/*" element={<NotFoundComponent />} />
          <Route exact path="/market/:Symbol" element={<StockDetail />} />
          <Route path="/order/:symbol" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
