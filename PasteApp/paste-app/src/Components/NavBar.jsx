import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/download.svg';

const NavBar = () => {
  return (
    <nav>
      <div className="logo-area">
        <img src={logo} alt="Notes Logo" className="logo-img" />
        <span className="logo-text">Notes</span>
      </div>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/notes">All Notes</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
