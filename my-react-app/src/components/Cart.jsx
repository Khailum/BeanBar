import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("in-store"); // default

  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        const sanitized = data.map((item) => ({
          ...item,
          quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
        }));
        setCartItems(sanitized);
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, []);

  const increaseQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity === 1) {
      handleDelete(id);
    } else {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const updateQuantity = (id, quantity) => {
    fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    })
      .then(() => {
        setCartItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const totalQuantity = cartItems.reduce((sum, item) => {
    const qty = typeof item.quantity === "number" ? item.quantity : 0;
    return sum + qty;
  }, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const qty = typeof item.quantity === "number" ? item.quantity : 0;
    const price = typeof item.Price === "number" ? item.Price : 0;
    return sum + price * qty;
  }, 0);

  const deliveryFee = deliveryOption === "delivery" ? 100 : 0;
  const totalPrice = subtotal + deliveryFee;

  const saveCartToApi = async () => {
    const OrderNum = Math.floor(Math.random() * 1000000);
    try {
      const response = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          OrderNum,
          deliveryOption,
          deliveryFee,
          totalPrice,
          cartItems,
        }),
      });

      if (!response.ok) throw new Error("Failed to save cart to server.");

      return OrderNum;
    } catch (error) {
      console.error("Error saving cart:", error);
      alert("Could not complete checkout. Try again.");
      return null;
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-section">
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.ImageUrl} alt={item.ItemName} width="100" />
              <div className="item-details">
                <h3 className="item-name">{item.ItemName}</h3>
                <p className="item-price">
                  Price: <strong>R{item.Price.toFixed(2)}</strong>
                </p>
                <p>{item.ItemDescription}</p>
                {item.type === "Hot" && (
                  <>
                    <p><strong>Sugar:</strong> {item.sugarLevel}</p>
                    <p><strong>Milk:</strong> {item.milkType}</p>
                  </>
                )}
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

      {/* Delivery Option */}
      <div className="delivery-option">
        <h3>Choose Delivery Option:</h3>
        <label>
          <input
            type="radio"
            value="in-store"
            checked={deliveryOption === "in-store"}
            onChange={() => setDeliveryOption("in-store")}
          />
          In-Store Pickup (Free)
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="delivery"
            checked={deliveryOption === "delivery"}
            onChange={() => setDeliveryOption("delivery")}
          />
          Delivery (R100 fee)
        </label>
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p><strong>Total Items:</strong> {totalQuantity}</p>
        <p><strong>Subtotal:</strong> R{subtotal.toFixed(2)}</p>
        <p><strong>Delivery Fee:</strong> R{deliveryFee.toFixed(2)}</p>
        <p><strong>Total Price:</strong> R{totalPrice.toFixed(2)}</p>
      </div>

      {/* Checkout */}
      {cartItems.length > 0 && (
        <button
          className="checkout-btn"
          onClick={async () => {
            const orderNum = await saveCartToApi();
            if (orderNum) {
              navigate("/payment", {
                state: { totalPrice, cartItems, orderNum, deliveryOption },
              });
            }
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
}

export default CartPage;
