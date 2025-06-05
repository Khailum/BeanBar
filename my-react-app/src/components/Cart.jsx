import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("in-store");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch cart items
  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        const sanitized = items.map((item) => ({
          ...item,
          quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
        }));
        setCartItems(sanitized);
      })
      .catch((err) => {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
      });
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }).catch((err) => console.error("Error updating quantity:", err));
  };

  const handleQuantityChange = (id, type) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (type === "increase") {
      updateQuantity(id, item.quantity + 1);
    } else if (type === "decrease") {
      if (item.quantity === 1) {
        handleDelete(id);
      } else {
        updateQuantity(id, item.quantity - 1);
      }
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
  const deliveryFee = deliveryOption === "delivery" ? 100 : 0;
  const totalPrice = subtotal + deliveryFee;

  const saveCartToApi = async () => {
    const orderNum = Math.floor(Math.random() * 1000000);

    try {
      await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNum,
          deliveryOption,
          deliveryFee,
          totalPrice,
          orderStatus: "Pending",
        }),
      });

      for (const item of cartItems) {
        await fetch("http://localhost:3000/orderItems", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderNum,
            itemName: item.itemName,
            quantity: item.quantity,
            price: item.price,
            itemDescription: item.itemDescription || "",
            itemType: item.itemType || "",
            sugarType: item.sugarType || "",
            milkType: item.milkType || "",
            imageUrl: item.imageUrl || "",
            isAvailable: item.isAvailable !== undefined ? item.isAvailable : 1,
          }),
        });
      }

      await Promise.all(
        cartItems.map((item) =>
          fetch(`http://localhost:3000/cart/${item.id}`, {
            method: "DELETE",
          })
        )
      );

      setCartItems([]);
      alert("Order placed successfully!");
      return orderNum;
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
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.itemName} width="100" />
              <div className="item-details">
                <h3>{item.itemName}</h3>
                <p>
                  Price: <strong>R{(item.price ?? 0).toFixed(2)}</strong>
                </p>
                <p>{item.itemDescription}</p>
                {item.sugarType && <p><strong>Sugar:</strong> {item.sugarType}</p>}
                {item.milkType && <p><strong>Milk:</strong> {item.milkType}</p>}
              </div>
              <div className="cart-actions">
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, "decrease")}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, "increase")}>+</button>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>

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

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p><strong>Total Items:</strong> {totalQuantity}</p>
        <p><strong>Subtotal:</strong> R{subtotal.toFixed(2)}</p>
        <p><strong>Delivery Fee:</strong> R{deliveryFee.toFixed(2)}</p>
        <p><strong>Total Price:</strong> R{totalPrice.toFixed(2)}</p>
      </div>

      {cartItems.length > 0 && (
        <button
          className="checkout-btn"
          onClick={async () => {
            setIsSaving(true);
            const orderNum = await saveCartToApi();
            setIsSaving(false);

            if (orderNum) {
              navigate("/payment", {
                state: { totalPrice, cartItems, orderNum, deliveryOption },
              });
            }
          }}
          disabled={isSaving}
        >
          {isSaving ? "Processing..." : "Checkout"}
        </button>
      )}
    </div>
  );
}

export default CartPage;
