import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RequireUnAuth = ({ children }) => {
  const { userData } = useAuth();

  return userData ? <Navigate to="/" /> : children;
};

export default RequireUnAuth;
