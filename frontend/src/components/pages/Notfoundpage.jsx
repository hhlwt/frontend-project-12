import React from 'react';
import { useTranslation } from 'react-i18next';

const Notfoundpage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-5 text-light">
      <h1>{t('notFound')}</h1>
    </div>
  );
};

export default Notfoundpage;
