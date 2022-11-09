import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addChannel, deleteChannel, updateChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import Layout from './Layout.jsx';
import Chat from './HomePage/Chat.jsx';
import Login from './AuthorizationPage/Authorization.jsx';
import Signup from './SignUpPage/Signup.jsx';
import Notfoundpage from './NotFoundPage/Notfoundpage.jsx';
import RequireAuth from '../hoc/RequireAuth.jsx';
import RequireUnAuth from '../hoc/RequireUnAuth.jsx';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('renameChannel', ({ id, name }) => {
    dispatch(updateChannel({ id, changes: { name } }));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(deleteChannel(id));
  });

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={(
            <RequireAuth>
              <Chat socket={socket} />
            </RequireAuth>
            )}
        />
        <Route
          path="login"
          element={(
            <RequireUnAuth>
              <Login />
            </RequireUnAuth>
        )}
        />
        <Route
          path="signup"
          element={(
            <RequireUnAuth>
              <Signup />
            </RequireUnAuth>
        )}
        />
        <Route path="*" element={<Notfoundpage />} />
      </Route>
    </Routes>
  );
};

export default App;
