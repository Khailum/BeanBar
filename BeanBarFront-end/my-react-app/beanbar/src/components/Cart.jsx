import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("in-store");
  const [isSaving, setIsSaving] = useState(false);
  const [orderNum, setOrderNum] = useState(null);

  const API_BASE = "https://localhost:7233/api";

  // Fetch cart items for current orderNum
  useEffect(() => {
    const currentOrderNum = localStorage.getItem("orderNum");
    if (!currentOrderNum) return;

    setOrderNum(currentOrderNum);

    fetch(`${API_BASE}/Cart/order/${currentOrderNum}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sanitized = data.map(item => ({
            ...item,
            quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
          }));
          setCartItems(sanitized);
        }
      })
      .catch(err => {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
      });
  }, []);

  const updateQuantity = async (cartID, quantity) => {
    if (quantity < 1) return;

    const itemToUpdate = cartItems.find(i => i.cartID === cartID);
    if (!itemToUpdate) return;

    const updated = { ...itemToUpdate, quantity };

    await fetch(`${API_BASE}/Cart/${cartID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });

    setCartItems(prev =>
      prev.map(i => (i.cartID === cartID ? { ...i, quantity } : i))
    );
  };

  const handleQuantityChange = (cartID, action) => {
    const item = cartItems.find(i => i.cartID === cartID);
    if (!item) return;

    if (action === "increase") {
      updateQuantity(cartID, item.quantity + 1);
    } else if (action === "decrease") {
      item.quantity === 1 ? handleDelete(cartID) : updateQuantity(cartID, item.quantity - 1);
    }
  };

  const handleDelete = async (cartID) => {
    if (!window.confirm("Remove this item?")) return;

    await fetch(`${API_BASE}/Cart/${cartID}`, {
      method: "DELETE"
    });

    setCartItems(prev => prev.filter(i => i.cartID !== cartID));
  };

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = deliveryOption === "delivery" ? 100 : 0;
  const totalPrice = subtotal + deliveryFee;

  const checkout = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE}/Cart/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerID: cartItems[0]?.customerID || "guest",
          deliveryOption,
          totalPrice,
          cartItems
        })
      });

      if (!response.ok) throw new Error("Submit failed");

      const result = await response.json();
      localStorage.setItem("orderNum", result.orderNum);
      setCartItems([]);
      navigate("/payment", {
        state: {
          totalPrice,
          cartItems,
          orderNum: result.orderNum,
          deliveryOption
        }
      });
    } catch (error) {
      alert("Checkout failed. Please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-section">
        {cartItems.length ? cartItems.map(item => (
          <div key={item.cartID} className="cart-item">
            <img src={item.imageUrl} alt={item.itemName} width="100" />
            <div className="item-details">
              <h3>{item.itemName}</h3>
              <p>Price: <strong>R{item.price.toFixed(2)}</strong></p>
              {item.itemDescription && <p>{item.itemDescription}</p>}
            </div>
            <div className="cart-actions">
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.cartID, "decrease")} className="qty-btn">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.cartID, "increase")} className="qty-btn">+</button>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(item.cartID)}>Remove</button>
            </div>
          </div>
        )) : <p>No items in the cart.</p>}
      </div>

      <div className="delivery-option">
        <h3>Choose Delivery Option:</h3>
        <label>
          <input type="radio" value="in-store" checked={deliveryOption === "in-store"} onChange={() => setDeliveryOption("in-store")} />
          In-Store Pickup (Free)
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input type="radio" value="delivery" checked={deliveryOption === "delivery"} onChange={() => setDeliveryOption("delivery")} />
          Delivery (R100 fee)
        </label>
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p><strong>Total Items:</strong> {totalQuantity}</p>
        <p><strong>Subtotal:</strong> R{subtotal.toFixed(2)}</p>
        <p><strong>Delivery Fee:</strong> R{deliveryFee.toFixed(2)}</p>
        <p><strong>Total Price:</strong> R{totalPrice.toFixed(2)}</p>
      </div>

      {cartItems.length > 0 && (
        <button className="checkout-btn" onClick={checkout} disabled={isSaving}>
          {isSaving ? "Processing..." : "Checkout"}
        </button>
      )}
    </div>
  );
}

export default CartPage;
