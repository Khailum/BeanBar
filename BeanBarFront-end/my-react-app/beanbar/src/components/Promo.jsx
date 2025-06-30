import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Promo.css";

function Promo() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [addedIndex, setAddedIndex] = useState(null);
  const [orderNum, setOrderNum] = useState(null);
  const API_BASE = "https://localhost:7233/api";

  const handleMouseDown = () => setIsAnimating(false);
  const handleMouseUp = () => setIsAnimating(true);

  const products = [
    { id: 1, name: "Mocha", price: 21.99, oldPrice: 24.99, description: "Delicious mocha drink.", image: "https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png", type: "Hot" },
    { id: 2, name: "Pancakes", price: 25.00, oldPrice: 28.00, description: "Stack of pancakes.", image: "https://i.ibb.co/xtxnGd7p/pancake-removebg-preview.png", type: "Snack" },
    { id: 3, name: "Ice Tea", price: 19.99, oldPrice: 22.50, description: "Refreshing iced tea.", image: "https://i.ibb.co/PswcJJwx/ice-tea-removebg-preview.png", type: "Cold" },
    { id: 4, name: "Chocolate Muffin", price: 23.50, oldPrice: 26.00, description: "Rich chocolate muffin.", image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png", type: "Snack" },
    { id: 5, name: "Vanilla Swirl", price: 24.99, oldPrice: 27.99, description: "Creamy vanilla delight.", image: "https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png", type: "Cold" },
    { id: 6, name: "Caramel Ice", price: 20.00, oldPrice: 22.00, description: "Chilled caramel drink.", image: "https://i.ibb.co/xtxnGd7p/pancake-removebg-preview.png", type: "Cold" },
    { id: 7, name: "Minty Breeze", price: 22.75, oldPrice: 25.00, description: "Cool minty treat.", image: "https://i.ibb.co/PswcJJwx/ice-tea-removebg-preview.png", type: "Cold" },
    { id: 8, name: "Berry Freeze", price: 26.99, oldPrice: 29.99, description: "Frozen berry drink.", image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png", type: "Cold" },
    { id: 9, name: "Hazelnut Chill", price: 21.00, oldPrice: 23.50, description: "Hazelnut-infused ice drink.", image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png", type: "Cold" },
    { id: 10, name: "Toffee Crunch", price: 19.50, oldPrice: 21.99, description: "Crunchy toffee dessert.", image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png", type: "Snack" },
  ];

  // Get or create OrderNum on mount
  useEffect(() => {
    const storedOrderNum = localStorage.getItem("orderNum");
    if (storedOrderNum) {
      setOrderNum(storedOrderNum);
    } else {
      createOrder();
    }
  }, []);

  const createOrder = async () => {
    try {
      const response = await fetch(`${API_BASE}/Cart/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerID: "guest", // replace with actual customerID if available
          deliveryOption: "in-store"
        }),
      });
      const order = await response.json();
      setOrderNum(order);
      localStorage.setItem("orderNum", order);
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  const addToCart = async (product, index) => {
    if (!orderNum) {
      alert("Unable to add to cart. Order number not available.");
      return;
    }

    try {
      const menuResponse = await fetch(`${API_BASE}/Menu`);
      const menuItems = await menuResponse.json();
      const matchedItem = menuItems.find(item => item.itemName === product.name);

      if (!matchedItem) {
        alert("Item not found in menu.");
        return;
      }

      const addRes = await fetch(`${API_BASE}/Cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNum: parseInt(orderNum),
          itemID: matchedItem.itemID,
          quantity: 1
        }),
      });

      if (!addRes.ok) throw new Error("Failed to add item");

      setAddedIndex(index);
      setTimeout(() => setAddedIndex(null), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

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
      >
        {products.map((product, index) => (
          <div
            className="box"
            key={product.id}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <div className="price">
              R{product.price.toFixed(2)} <span>R{product.oldPrice.toFixed(2)}</span>
            </div>
            <button
              className={`btn ${addedIndex === index ? "added" : ""}`}
              onClick={() => addToCart(product, index)}
            >
              {addedIndex === index ? "✔ Added" : "Add To Cart"}
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Promo;
