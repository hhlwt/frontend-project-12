import React from 'react';
import useAuth from '../hooks/useAuth';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthButton = () => {
  const auth = useAuth();

  return auth.loggedIn ? <Button onClick={auth.logOut}>LogOut</Button> : null;
};

export default AuthButton;