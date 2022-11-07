import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales/index.js'
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './slices/index.js';
import { Provider, ErrorBoundary } from '@rollbar/react';
import AuthProvider from "./hoc/AuthProvider.jsx";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

const rollbarConfig = {
  accessToken: 'c92f6490319e4c65b92d5f205e63985b',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const runApp = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <Provider config={rollbarConfig}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Provider>
        </AuthProvider>
      </I18nextProvider>
    </StoreProvider>
  </BrowserRouter>
  );
};

export default runApp;