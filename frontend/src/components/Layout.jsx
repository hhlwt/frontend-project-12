import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LogOutButton from './LogOutButton';

function Layout() {
  return (
    <div className="d-flex flex-column h-100">
      <header>
        <Link to="/" className="chat-link">Hexlet chat</Link>
        <LogOutButton />
      </header>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Outlet />
    </div>
  );
}

export { Layout };