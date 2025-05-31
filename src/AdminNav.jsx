// src/components/AdminNav.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminNav.css';

const AdminNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className="admin-header">
      <div className="admin-logo-title">
        <h1 className="admin-title">Bean Bar Admin</h1>
        <div id="menu-btn" onClick={toggleMenu}>☰</div>
      </div>
      <nav className={`admin-navbar ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Dashboard</Link>
        <Link to="/menu" onClick={toggleMenu}>Menu</Link>
        <Link to="/orders" onClick={toggleMenu}>Orders</Link>
        <Link to="/delivery" onClick={toggleMenu}>Delivery</Link>
        <Link to="/stock" onClick={toggleMenu}>Stock</Link>
        <Link to="/reservations" onClick={toggleMenu}>Reservations</Link>
        <Link to="/promotions" onClick={toggleMenu}>Promotions</Link>
        <Link to="/review" onClick={toggleMenu}>Review</Link>
        <Link to="/userProfile" onClick={toggleMenu}>Profile</Link>
      </nav>
    </header>
  );
};

export default AdminNav;
