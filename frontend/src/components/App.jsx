import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Notfoundpage from "./pages/Notfoundpage.jsx";
import { Layout } from "./Layout.jsx";
import Login from "./pages/Authorization.jsx";
import RequireAuth from '../hoc/RequireAuth.jsx'
import AuthProvider from "../hoc/AuthProvider.jsx";

export default function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          } />
          <Route path="login" element={<Login />}/>
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
