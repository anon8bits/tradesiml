import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.js';

const PrivateRoute = ({ element }) => {
    const { authState } = useContext(AuthContext);
    return authState.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
