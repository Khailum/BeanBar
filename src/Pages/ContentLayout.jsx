// src/Pages/ContentLayout.jsx
import React from 'react';
import './ContentLayout.css';

const ContentLayout = ({ children }) => {
  return (
    <div className="centered-layout">
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default ContentLayout;
