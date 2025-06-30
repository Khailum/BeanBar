import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="about-content">
        <h2 className="section-header">ABOUT <span>US</span></h2>

        <p className="text-block text-light">
          Welcome to <strong>Bean Bar</strong> — where passion meets every pour. We’re more than just a coffee shop;
          we’re a space built for community, creativity, and connection. Every cup of coffee we serve
          is crafted with ethically sourced beans, roasted to perfection, and brewed with care.
        </p>

        <p className="text-block text-gold">
          At Bean Bar, you’ll find a relaxing atmosphere that invites you to linger — whether
          you're catching up with friends, powering through work, or simply enjoying some me-time.
          Our cozy setup, friendly baristas, and signature blends make Bean Bar your daily ritual
          and a second home for coffee lovers.
        </p>

        <p className="text-block text-light">
          We currently operate from two convenient locations — <strong>Pinelands</strong> and <strong>Cape Town</strong> —
          ensuring our welcoming vibe and aromatic brews are never too far away.
        </p>
      </div>

      <h2 className="section-header"><span>MEET</span> our team</h2>

      <div className="hero-container">
        <div className="hero">
          <a
            href="https://www.linkedin.com/in/tharollo-kekana-038225274/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/Image__2_-removebg-preview.png"
              className="team"
              alt="Tharollo Kekana"
            />
          </a>
          <h3>Tharollo Kekana</h3>
          <p>Founder & CEO</p>
        </div>

        <div className="hero">
          <a
            href="https://www.linkedin.com/in/rethabile-makaotsi-b47258241/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://i.ibb.co/YPN9Q3g/IMG-20240107-WA0005-065850-removebg-preview.png"
              className="team"
              alt="Rethabile Makaotsi"
            />
          </a>
          <h3>Rethabile Makaotsi</h3>
          <p>Head Barista</p>
        </div>

        <div className="hero">
          <a
            href="https://www.linkedin.com/in/khailum-undefined-0a16ba347/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/Image__1_-removebg-preview.png"
              className="team"
              alt="Khailum Pieterson"
            />
          </a>
          <h3>Khailum Pieterson</h3>
          <p>Chef & Beverage Expert</p>
        </div>

        <div className="hero">
          <a
            href="https://www.linkedin.com/in/tharollo-kekana-038225274"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/IMG-20250506-WA0003-removebg-preview.png"
              className="team"
              alt="Fulufhelo Mashaya"
            />
          </a>
          <h3>Fulufhelo Mashaya</h3>
          <p>Operations Manager</p>
        </div>
      </div>
    </div>
  );
}

export default About;
