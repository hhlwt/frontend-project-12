import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children }) => {
  const { userData } = useAuth();

  return userData ? children : <Navigate to="/login" />;
};

export default RequireAuth;
