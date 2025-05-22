import React from "react";
import "./Footer.css"; // assuming you'll create this CSS file

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Bean Bar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
