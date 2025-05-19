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
        <img src="/images/Black Round Badge Coffee Cup Logo.png" className="logo" alt="logo" />
      </Link>

      <nav className={`navbar ${menuActive ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/product">Product</Link>
        <Link to="/contact">Contact</Link>
        {/* Add other links as needed */}
      </nav>

      <div className="header-right">
        <div className="icons">
          <div className="fas fa-search" onClick={() => setSearchActive(!searchActive)}></div>
          <div className="fas fa-shopping-cart" onClick={() => setCartActive(!cartActive)}></div>
        </div>
        <Link to="/login" className="btnn">Login</Link>
      </div>
    </header>
  );
};

export default Header;
