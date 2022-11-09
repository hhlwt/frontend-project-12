import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import io from 'socket.io-client';
import { store } from './slices/index.js';
import resources from './locales/index.js';
import App from './components/App.jsx';
import AuthProvider from './hoc/AuthProvider.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const runApp = async () => {
  const i18n = i18next.createInstance();
  const socket = io.connect();

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
                <App socket={socket} />
              </ErrorBoundary>
            </Provider>
          </AuthProvider>
        </I18nextProvider>
      </StoreProvider>
    </BrowserRouter>,
  );
};

export default runApp;
