 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function CartPage() {
  const navigate = useNavigate();

  // Cart stored locally - start empty or load from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Products data fetched once from mock API
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/menu") // replace with your product API URL
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Save cart to localStorage on change for persistence
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Join cart with product details
  const cartItemsWithDetails = cartItems.map(({ itemId, quantity, sugarLevel, milkType }) => {
    const product = products.find((p) => p.id === itemId);
    return {
      ...product,
      quantity,
      sugarLevel,
      milkType,
    };
  });

  const increaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.itemId === itemId);
      if (!found) return prev;
      if (found.quantity === 1) return prev.filter((item) => item.itemId !== itemId);
      return prev.map((item) =>
        item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleDelete = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItemsWithDetails.reduce(
    (sum, item) => sum + (item?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-section">
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItemsWithDetails.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">
                  Price: <strong>R{item.price.toFixed(2)}</strong>
                </p>
                <p>{item.description}</p>
                <p><strong>Sugar:</strong> {item.sugarLevel}</p>
                <p><strong>Milk:</strong> {item.milkType}</p>
              </div>

              <div className="cart-actions">
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p><strong>Total Items:</strong> {totalQuantity}</p>
        <p><strong>Total Price:</strong> R{totalPrice.toFixed(2)}</p>
      </div>

      {cartItems.length > 0 && (
        <button
          className="checkout-btn"
          onClick={() => navigate("/payment", { state: { totalPrice, cartItems } })}
        >
          Checkout
        </button>
      )}
    </div>
  );
}

export default CartPage;
 