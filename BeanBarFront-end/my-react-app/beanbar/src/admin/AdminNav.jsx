// src/admin/AdminNav.jsx 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅ Add useNavigate
import './AdminNav.css';

const AdminNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ⬅ Initialize navigate

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Clear session/local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    // Redirect to homepage
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="admin-logo-title">
        <Link to="/admin/dashboard">
          <img src="/images/Black Round Badge Coffee Cup Logo.png" alt="BeanBar Logo" className="logo" />
        </Link>
        <div className="admin-title">BeanBar Admin</div>
        <div id="menu-btn" onClick={toggleMenu}>☰</div>
      </div>

      <nav className={`admin-navbar ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/admin/dashboard" onClick={toggleMenu}>Dashboard</Link>
        <Link to="/admin/menu" onClick={toggleMenu}>Menu</Link>
        <Link to="/admin/orders" onClick={toggleMenu}>Orders</Link>
        <Link to="/admin/delivery" onClick={toggleMenu}>Delivery</Link>
        <Link to="/admin/stock" onClick={toggleMenu}>Stock</Link>
        <Link to="/admin/reservations" onClick={toggleMenu}>Reservations</Link>
        <Link to="/admin/promotions" onClick={toggleMenu}>Promotions</Link>
        <Link to="/admin/review" onClick={toggleMenu}>Review</Link>
        <Link to="/admin/userProfile" onClick={toggleMenu}>Profile</Link>
      </nav>

      <div className="header-right">
        <button className="btnn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default AdminNav;
