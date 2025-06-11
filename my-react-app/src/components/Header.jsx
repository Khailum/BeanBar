import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage first
    let storedUser = localStorage.getItem("user");

    // If not found in localStorage, check sessionStorage
    if (!storedUser) {
      storedUser = sessionStorage.getItem("user");
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user"); // Also clear sessionStorage on logout
    localStorage.removeItem("profile");
    sessionStorage.removeItem("profile");
    setUser(null);
    navigate("/login");
  };

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
        <Link to="/review" onClick={() => setMenuActive(false)}>Review</Link>
        <Link to="/contact" onClick={() => setMenuActive(false)}>Contact</Link>
        {/* <Link to="/userprofile" onClick={() => setMenuActive(false)}>Profile</Link> */}
      </nav>

      {/* Login / Logout Button */}
      <div className="header-right">
        {user ? (
          <button onClick={handleLogout} className="btnn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btnn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
