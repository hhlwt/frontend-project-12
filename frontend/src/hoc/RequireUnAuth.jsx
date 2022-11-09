import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireUnAuth = ({ children }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Navigate to="/" /> : children;
};

export default RequireUnAuth;
