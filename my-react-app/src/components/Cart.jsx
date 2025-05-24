import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cappuccino",
      description: "Rich espresso with steamed milk.",
      price: 30,
      sugarLevel: "Medium",
      milkType: "Full Cream",
      image: "https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Latte",
      description: "Smooth coffee with frothy milk.",
      price: 35,
      sugarLevel: "Low",
      milkType: "Oat Milk",
      image: "https://via.placeholder.com/100",
      quantity: 1,
    },
  ]);

  const addItem = (itemToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id);
      if (!item) return prevItems;

      if (item.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-section">
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">
                  Price: <strong>R{item.price.toFixed(2)}</strong>
                </p>
                <p>{item.description}</p>
                <p>
                  <strong>Sugar:</strong> {item.sugarLevel}
                </p>
                <p>
                  <strong>Milk:</strong> {item.milkType}
                </p>
              </div>

              <div className="cart-actions">
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p>
          <strong>Total Items:</strong> {totalQuantity}
        </p>
        <p>
          <strong>Total Price:</strong> R{totalPrice.toFixed(2)}
        </p>
      </div>

      {cartItems.length > 0 && (
        <button
          className="checkout-btn"
          onClick={() => navigate("/payment", { state: { totalPrice } })}
        >
          Checkout
        </button>
      )}
    </div>
  );
}

export default CartPage;
