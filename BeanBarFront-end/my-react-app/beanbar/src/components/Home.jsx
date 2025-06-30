import React from 'react';
import './Home.css';
import Promo from './Promo';

const Home = () => {
  
  return (
    <section className="home" id="home">
      <div className="content-wrapper">
        <div className="content">
          <h3>
            Your daily dose of <span>delight</span>
          </h3>
          <p>
Welcome to BeanBar — your cozy stop for quality coffee and good vibes. From rich espressos to smooth cappuccinos, every cup is crafted with care. Whether you're on the go or here to unwind, BeanBar is your perfect daily pick-me-up.          </p>
         <div className="btn-group">
  <a href="/product" className="btn">
    Get yours now
  </a>
  <a href="/reservation"   className="btn">
    Book a Table
  </a>
</div>
        </div>

        <div className="home-image">
          <img src="/images/image.png" alt="coffee" />
        </div>
      </div>

      <Promo />
    </section>
  );
};

export default Home;
