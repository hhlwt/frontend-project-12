import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>
        <Link to="/" style={{'padding-right': '10px'}}>Home</Link>
        <Link to="/login">Login</Link>
      </header>
      <main className='container'><Outlet /></main>
    </>
  );
}

export { Layout };