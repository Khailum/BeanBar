import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();

  // User Profile State
  const [image, setImage] = useState('default-avatar.png');
  const user = {
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '062 123 4567',
    address: 'Cape Town, South Africa',
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Cart State
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk.',
      price: 30,
      sugarLevel: 'Medium',
      milkType: 'Full Cream',
      image: 'https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Latte',
      description: 'Smooth coffee with frothy milk.',
      price: 35,
      sugarLevel: 'Low',
      milkType: 'Oat Milk',
      image: 'https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png',
      quantity: 1,
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item.quantity === 1) return prev.filter((item) => item.id !== id);
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="dashboard-container">
      {/* User Profile Section */}
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-image">
          {image === 'default-avatar.png' ? (
            <i className="fas fa-user-circle login-icon-main"></i>
          ) : (
            <img src={image} alt="Profile" />
          )}
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        <div className="user-details">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: <strong>R{item.price.toFixed(2)}</strong></p>
                <p>{item.description}</p>
                <p><strong>Sugar:</strong> {item.sugarLevel}</p>
                <p><strong>Milk:</strong> {item.milkType}</p>
              </div>
              <div className="cart-actions">
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p><strong>Total Items:</strong> {totalQuantity}</p>
          <p><strong>Total Price:</strong> R{totalPrice.toFixed(2)}</p>
          {cartItems.length > 0 && (
            <button
              className="checkout-btn"
              onClick={() => navigate("/payment", { state: { totalPrice } })}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
