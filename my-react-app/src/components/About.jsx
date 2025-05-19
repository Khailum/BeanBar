import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-content">
        <h1 className='head'>About Us</h1>
        <p className='intro'>
          Welcome to Brew Haven — your neighborhood coffee sanctuary.
          We serve handcrafted beverages made from premium beans,
          paired with a cozy atmosphere and friendly faces.
          Whether you're here to unwind or catch up with friends,
          Brew Haven is your go-to spot for warmth, aroma, and connection.
        </p>
        <p className='intro'> Welcome to Brew Haven — your neighborhood coffee sanctuary.
          We serve handcrafted beverages made from premium beans,
          paired with a cozy atmosphere and friendly faces.
          Whether you're here to unwind or catch up with friends,
          Brew Haven is your go-to spot for warmth, aroma, and connection.</p>
      </div>

      <h2 className="subheading">meet our team</h2>

      <div className="hero-container">
        <div className="hero">
    

          <img src="/images/Image__1_-removebg-preview.png" className="team" alt="Thabo Mokoena" />
          {/* my-react-app/public/Image__1_-removebg-preview.png */}
          <h3>Thabo Mokoena</h3>
          <p>Head Barista</p>
        </div>
        <div className="hero">
        <img src="/images/Image__2_-removebg-preview.png" className="team" alt="Thabo Mokoena" />
                  <h3>Lebo Mtomboti</h3>
          <p>Customer Service</p>
        </div>
        <div className="hero">
        <img src="/images/IMG-20250506-WA0003-removebg-preview.png"className='team' alt="Thabo Mokoena" />
                  <h3>Anele Dlamini</h3>
          <p>Chef & Beverage Expert</p>
        </div>
      </div>
    </div>
  );
}

export default About;
