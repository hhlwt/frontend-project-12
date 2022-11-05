import React from 'react';
import useAuth from '../hooks/useAuth';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LogOutButton = () => {
  const {t} = useTranslation();
  const auth = useAuth();

  return auth.loggedIn ? <Button onClick={auth.logOut} className="logOut-btn" variant="secondary-outline">{t('logOutBtn')}</Button> : null;
};

export default LogOutButton;