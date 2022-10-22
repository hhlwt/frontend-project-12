import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthButton from './AuthButton';

function Layout() {
  return (
    <>
      <header>
        <Link to="/" className="home" style={{'paddingRight': '10px'}}>Home</Link>
        <AuthButton />
      </header>
      <main className='container'><Outlet /></main>
    </>
  );
}

export { Layout };