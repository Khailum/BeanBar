import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Promo.css';

function Promo() {
  // ✅ Reactivate animation control
  const [isAnimating, setIsAnimating] = useState(true);

  const handleMouseDown = () => {
    setIsAnimating(false);
  };

  const handleMouseUp = () => {
    setIsAnimating(true);
  };

  return (
    <div className="promo-wrapper">
      <h1>Special Deals</h1>
      <motion.div
        className="scroll-container"
        animate={{
          x: isAnimating ? "-50%" : 0,
        }}
        transition={{
          x: {
            repeat: isAnimating ? Infinity : 0,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {[...Array(2)].flatMap((_, i) =>
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div className="box" key={`${i}-${n}`}>
              <img
                src="/images/pngtree-iced-coffee-glass-with-splash-png-image_12360545-removebg-preview (1).png"
                alt="product"
              />
              <h3>creammy</h3>
              <div className="price">R21.99 <span>R20.99</span></div>
              <a href="#" className="btn">Add To Cart</a>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}

export default Promo;
