import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children }) => {
  const { loggedIn } = useAuth();
  
  return loggedIn ? children : <Navigate to="/login" />
};

export default RequireAuth;