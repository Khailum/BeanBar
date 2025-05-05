import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="container">
        <div className="content">
          <h3>
            Your daily dose of <span>delight</span>
          </h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates ratione ipsum quidem dolorum vero
            culpa alias minus, asperiores itaque saepe ducimus magni accusamus delectus laudantium facere cupiditate! Beatae,
            a est?
          </p>
          <a href="#" className="btn">
            Get yours now
          </a>
        </div>

        <img
          src="/images/image.png"
          alt="coffee"
        />
      </div>
    </section>
  );
};

export default Home;
