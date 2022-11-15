import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './Layout.jsx';
import Chat from './HomePage/Chat.jsx';
import Login from './AuthorizationPage/Authorization.jsx';
import Signup from './SignUpPage/Signup.jsx';
import Notfoundpage from './NotFoundPage/Notfoundpage.jsx';
import RequireAuth from '../contextComponents/RequireAuth.jsx';
import RequireUnAuth from '../contextComponents/RequireUnAuth.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={(
          <RequireAuth>
            <Chat />
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

export default App;
