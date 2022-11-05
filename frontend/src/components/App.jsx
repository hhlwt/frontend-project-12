import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from "./Layout.jsx";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Authorization.jsx";
import Signup from "./pages/Signup.jsx";
import Notfoundpage from "./pages/Notfoundpage.jsx";
import RequireAuth from '../hoc/RequireAuth.jsx'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          } />
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
  );
}
