import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home, Login, Market, Signup, Navbar, StockDetail, Order, Profile, Portfolio, OrderDetails, NotFoundComponent, Navbar2 } from './components/index.js';
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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundComponent />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orderdetails/:status/:orderID" element={<OrderDetails />} />
          <Route path="/orderdetails/*" element={<NotFoundComponent />} />
          <Route exact path="/market/:Symbol" element={<StockDetail />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
