import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Notfoundpage from "./pages/Notfoundpage.jsx";
import { Layout } from "./Layout.jsx";
import Login from "./pages/Authorization.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />}/>
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}
