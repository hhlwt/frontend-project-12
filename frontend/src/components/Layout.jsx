import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthButton from './AuthButton';

function Layout() {
  return (
    <div className="d-flex flex-column h-100">
      <header>
        <Link to="/" className="home" style={{'paddingRight': '10px'}}>Home</Link>
        <AuthButton />
      </header>
      <Outlet />
    </div>
  );
}

export { Layout };