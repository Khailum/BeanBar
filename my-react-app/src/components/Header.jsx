import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className="header">
      <a href="/">
        <img src="/images/Black Round Badge Coffee Cup Logo.png" className="logo" alt="logo" />
      </a>

      <nav className={`navbar ${menuActive ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Menu</a>
        <a href="/">Review</a>
        <a href="/">Contact</a>
      </nav>
      <div className="header-right">
  <div className="icons">
    <div className="fas fa-search" onClick={() => setSearchActive(!searchActive)}></div>
    <div className="fas fa-shopping-cart" onClick={() => setCartActive(!cartActive)}></div>
    {/* <div className="fas fa-bars" onClick={() => setMenuActive(!menuActive)}></div> */}
  </div>
  <a href="/" className="btnn">Login</a>
</div>

    </header>
  );
};

export default Header;
