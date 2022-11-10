/* eslint-disable react/jsx-no-constructed-context-values */
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
import { addChannel, deleteChannel, updateChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';
import AuthProvider from './hoc/AuthProvider.jsx';
import { SocketIoContext } from './hooks/useSocketIo.js';
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

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(updateChannel({ id, changes: { name } }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel(id));
  });

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });

  const emitNewMessage = (message, resolveCb, rejectCb) => {
    socket.timeout(5000).emit('newMessage', message, (err) => {
      if (err) {
        rejectCb();
        return;
      }
      resolveCb();
    });
  };

  const emitAddChannel = (channelName, resolveCb, rejectCb) => {
    socket.timeout(5000).emit('newChannel', channelName, (err) => {
      if (err) {
        rejectCb();
        return;
      }
      resolveCb();
    });
  };

  const emitDeleteChannel = (channelId, resolveCb, rejectCb) => {
    socket.timeout(5000).emit('removeChannel', channelId, (err) => {
      if (err) {
        rejectCb();
        return;
      }
      resolveCb();
    });
  };

  const emitRenameChannel = (channel, resolveCb, rejectCb) => {
    socket.timeout(5000).emit('renameChannel', channel, (err) => {
      if (err) {
        rejectCb();
        return;
      }
      resolveCb();
    });
  };

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <BrowserRouter>
      <SocketIoContext.Provider value={{
        emitNewMessage,
        emitAddChannel,
        emitDeleteChannel,
        emitRenameChannel,
      }}
      >
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
      </SocketIoContext.Provider>
    </BrowserRouter>,
  );
};

export default runApp;
