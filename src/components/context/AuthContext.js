import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext({
  authState: { isAuthenticated: false, user: null },
  setAuthState: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/auth/getuser`, {}, { withCredentials: true });
        setAuthState({ isAuthenticated: response.data.isAuthenticated, user: response.data.user });
      } catch (error) {
        setAuthState({ isAuthenticated: false, user: null });
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
