import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

const Notfoundpage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-5 text-light">
      <h1>{t('notFound')}</h1>
      <p>
        <Trans i18nKey="notFoundToHomeLink">
          Но вы можете перейти
          <Link to="/" className="homeLink">на главную</Link>
        </Trans>
      </p>
    </div>
  );
};

export default Notfoundpage;
