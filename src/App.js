import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Market from './components/Market.js';
import Signup from './components/Signup.js';
import Navbar from './components/Navbar.js';
import StockDetail from './components/StockDetail.js';
import Order from './components/Order.js';
import Test from './components/Test.js';
import { StockProvider } from './components/context/StockContext.js';
import { AuthProvider } from './components/context/AuthContext.js';
import PrivateRoute from './components/PrivateRoute.js';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <StockProvider>
        <>
          <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route exact="true" path="/" element={<Home />} />
              <Route exact="true" path="/login" element={<Login />} />
              <Route exact="true" path="/signup" element={<Signup />} />
              <Route exact="true" path="/market" element={<Market />} />
              <Route
                exact="true"
                path="/market/:symbol"
                element={<StockDetail />}
              />
              <Route path="/order" element={<PrivateRoute element={<Order />} />} />
              <Route exact="true" path="/test" element={<Test />} />
            </Routes>
          </BrowserRouter>
        </>
      </StockProvider>
    </AuthProvider>
  );
}

export default App;
