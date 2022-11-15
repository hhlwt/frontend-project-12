import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contextComponents/AuthProvider';

const LogOutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.userData ? <Button onClick={auth.logOut} className="logOut-btn" variant="secondary-outline">{t('logOutBtn')}</Button> : null;
};

export default LogOutButton;
