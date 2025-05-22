import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className="header">
      <Link to="/">
        <img
          src="/images/Black Round Badge Coffee Cup Logo.png"
          className="logo"
          alt="logo"
        />
      </Link>

      {/* Menu Icon for Mobile */}
      <div
        id="menu-btn"
        className={`fas fa-bars ${menuActive ? "fa-times" : ""}`}
        onClick={() => setMenuActive(!menuActive)}
      ></div>

      <nav className={`navbar ${menuActive ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuActive(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuActive(false)}>About</Link>
        <Link to="/product" onClick={() => setMenuActive(false)}>Products</Link>
         <Link to="/Review" onClick={() => setMenuActive(false)}>Review</Link>
        <Link to="/contact" onClick={() => setMenuActive(false)}>Contact</Link>
      </nav>

      <div className="header-right">
        <div className="icons">
          <div
            className="fas fa-search"
            onClick={() => setSearchActive(!searchActive)}
          ></div>
          <div
            className="fas fa-shopping-cart"
            onClick={() => setCartActive(!cartActive)}
          ></div>
        </div>
        <Link to="/login" className="btnn">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
