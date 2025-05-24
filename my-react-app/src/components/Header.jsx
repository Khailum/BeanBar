import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="logo-container" onClick={() => setMenuActive(false)}>
        <img
          src="/images/Black Round Badge Coffee Cup Logo.png"
          className="logo"
          alt="logo"
        />
      </Link>

      {/* Menu Icon */}
      <div
        id="menu-btn"
        className={`fas ${menuActive ? "fa-times" : "fa-bars"}`}
        onClick={() => setMenuActive(!menuActive)}
      ></div>

      {/* Navigation Links */}
      <nav className={`navbar ${menuActive ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuActive(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuActive(false)}>About</Link>
        <Link to="/product" onClick={() => setMenuActive(false)}>Products</Link>
        <Link to="/cart" onClick={() => setMenuActive(false)}>Cart</Link>
        <Link to="/payment" onClick={() => setMenuActive(false)}>Checkout</Link>
        <Link to="/review" onClick={() => setMenuActive(false)}>Review</Link>
        <Link to="/contact" onClick={() => setMenuActive(false)}>Contact</Link>
      </nav>

      {/* Login Button */}
      <div className="header-right">
        <Link to="/login" className="btnn">Login</Link>
      </div>
    </header>
  );
};

export default Header;
