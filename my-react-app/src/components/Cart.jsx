import React, { useState, useEffect } from "react"; // Import React hooks
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import "./Cart.css"; // Import cart-specific styles

function CartPage() {
  const navigate = useNavigate(); // Hook to navigate to another page
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [deliveryOption, setDeliveryOption] = useState("in-store"); // Delivery option state (default is in-store)
  const [isSaving, setIsSaving] = useState(false); // Indicates whether the cart is currently being saved

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/menu") // Replace this with /cart if that's your actual cart endpoint
      .then((res) => res.json())
      .then((data) => {
        // Ensure quantity is valid
        const sanitized = data.map((item) => ({
          ...item,
          quantity:
            typeof item.quantity === "number" && item.quantity > 0
              ? item.quantity
              : 1,
        }));
        setCartItems(sanitized); // Set the cleaned cart data
      })
      .catch((err) => console.error("Failed to fetch cart:", err)); // Log errors
  }, []);

  // Update the quantity of a specific cart item
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Avoid invalid quantities

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    // Persist the update to the backend
    fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }).catch((err) => console.error("Error updating quantity:", err));
  };

  // Handle increase/decrease buttons
  const handleQuantityChange = (id, type) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (type === "increase") {
      updateQuantity(id, item.quantity + 1);
    } else if (type === "decrease") {
      if (item.quantity === 1) {
        handleDelete(id); // Delete if quantity is 1
      } else {
        updateQuantity(id, item.quantity - 1);
      }
    }
  };

  // Handle deletion of an item
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove item from local state
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  // Calculate totals
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
  const deliveryFee = deliveryOption === "delivery" ? 100 : 0;
  const totalPrice = subtotal + deliveryFee;

  // Save order and cart data to the API
  const saveCartToApi = async () => {
    const orderNum = Math.floor(Math.random() * 1000000); // Generate order number

    try {
      // Save order
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

      // Save each item as part of the order
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

      // Clear cart from backend
      await Promise.all(
        cartItems.map((item) =>
          fetch(`http://localhost:3000/cart/${item.id}`, {
            method: "DELETE",
          })
        )
      );

      setCartItems([]); // Clear local cart
      alert("Order placed successfully!");
      return orderNum; // Return the order number for payment page
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
        {/* Show message if cart is empty */}
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.itemName} width="100" />
              <div className="item-details">
                <h3 className="item-name">{item.itemName}</h3>
                <p className="item-price">
                  Price: <strong>R{(item.price ?? 0).toFixed(2)}</strong>
                </p>
                <p>{item.itemDescription}</p>
                {/* Show sugar and milk only if they exist */}
                {item.sugarType && (
                  <p>
                    <strong>Sugar:</strong> {item.sugarType}
                  </p>
                )}
                {item.milkType && (
                  <p>
                    <strong>Milk:</strong> {item.milkType}
                  </p>
                )}
              </div>

              {/* Quantity controls */}
              <div className="cart-actions">
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, "increase")}
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

      {/* Delivery option radio buttons */}
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

      {/* Cart summary section */}
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p>
          <strong>Total Items:</strong> {totalQuantity}
        </p>
        <p>
          <strong>Subtotal:</strong> R{subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Delivery Fee:</strong> R{deliveryFee.toFixed(2)}
        </p>
        <p>
          <strong>Total Price:</strong> R{totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Checkout button */}
      {cartItems.length > 0 && (
        <button
          className="checkout-btn"
          onClick={async () => {
            setIsSaving(true); // Set saving state
            const orderNum = await saveCartToApi(); // Save the cart
            setIsSaving(false); // Reset saving state

            // Navigate to payment page with data
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

export default CartPage; // Export the component
