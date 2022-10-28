import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import LogOutButton from './LogOutButton';

function Layout() {
  return (
    <div className="d-flex flex-column h-100">
      <header>
        <Link to="/" className="chat-link">Home</Link>
        <LogOutButton />
      </header>
      <Outlet />
    </div>
  );
}

export { Layout };