import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './slices/index.js';
import AuthProvider from "./hoc/AuthProvider.jsx";
import './index.css'

const runApp = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
    });

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
  );
};

export default runApp;