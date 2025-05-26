import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Promo.css';

function Promo() {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleMouseDown = () => setIsAnimating(false);
  const handleMouseUp = () => setIsAnimating(true);

  // 🔟 List of 10 different products
  const products = [
    { id: 1, name: "Mocha", price: "R21.99", oldPrice: "R24.99",  description: "Stack of pancakes.",image: "https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png" },
    { id: 2, name: "Pancakes", price: "R25.00", oldPrice: "R28.00", description: "Stack of pancakes.", image: "https://i.ibb.co/xtxnGd7p/pancake-removebg-preview.png" },
    { id: 3, name: "Ice Tea", price: "R19.99", oldPrice: "R22.50",  description: "Stack of pancakes.",image: "https://i.ibb.co/PswcJJwx/ice-tea-removebg-preview.png" },
    { id: 4, name: "Chocolate Muffin", price: "R23.50", oldPrice: "R26.00", description: "Stack of pancakes.", image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png" },
    { id: 5, name: "Mocha", price: "R21.99", oldPrice: "R24.99", image: "https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png" },
    { id: 6, name: "Pancakes", price: "R25.00", oldPrice: "R28.00", description: "Stack of pancakes.", image: "https://i.ibb.co/xtxnGd7p/pancake-removebg-preview.png" },
    { id: 7, name: "Ice Tea", price: "R19.99", oldPrice: "R22.50",  description: "Stack of pancakes.", image: "https://i.ibb.co/PswcJJwx/ice-tea-removebg-preview.png" },
    { id: 8, name: "Chocolate Muffin", price: "R23.50", oldPrice: "R26.00",  description: "Stack of pancakes.",image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png" },
        { id: 9, name: "Chocolate Muffin", price: "R23.50", oldPrice: "R26.00",  description: "Stack of pancakes.", image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png" },
            { id: 10, name: "Chocolate Muffin", price: "R23.50", oldPrice: "R26.00", description: "Stack of pancakes.", image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png" },
    // { id: 5, name: "Vanilla Swirl", price: "R24.99", oldPrice: "R27.99", image: "/images/product5.png" },
    // { id: 6, name: "Caramel Ice", price: "R20.00", oldPrice: "R22.00", image: "/images/product6.png" },
    // { id: 7, name: "Minty Breeze", price: "R22.75", oldPrice: "R25.00", image: "/images/product7.png" },
    // { id: 8, name: "Berry Freeze", price: "R26.99", oldPrice: "R29.99", image: "/images/product8.png" },
    // { id: 9, name: "Hazelnut Chill", price: "R21.00", oldPrice: "R23.50", image: "/images/product9.png" },
    // { id: 10, name: "Toffee Crunch", price: "R19.50", oldPrice: "R21.99", image: "/images/product10.png" },
  ];

  return (
    <div className="promo-wrapper">
      <h1>Special Deals</h1>
      <motion.div
        className="scroll-container"
        animate={{ x: isAnimating ? "-50%" : 0 }}
        transition={{
          x: {
            repeat: isAnimating ? Infinity : 0,
            repeatType: "loop",
            duration: 90,
            ease: "linear",
          },
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {products.map((product) => (
          <div className="box" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
           <p className="description">{product.description}</p>
            <div className="price">
              {product.price} <span>{product.oldPrice}</span>
            </div>
            <a href="#" className="btn">Add To Cart</a>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Promo;
