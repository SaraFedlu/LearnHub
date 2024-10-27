import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    // If no token is found, redirect to the login page
    return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;