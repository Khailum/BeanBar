// src/components/UserProfile.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!user && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.customerID) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/userprofile?customerID=${user.customerID}`);
        const data = await res.json();
        if (data.length > 0) {
          setProfileData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <div className="loading">Loading user profile...</div>;

  if (!user || !profileData) {
    return (
      <div className="error">
        No user data found. <br />
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      <section className="profile-info">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> {profileData.fullName}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Phone:</strong> {profileData.phoneNumber || "N/A"}</p>
        <p><strong>Address:</strong> {profileData.address || "N/A"}</p>
        <p><strong>Customer ID:</strong> {profileData.customerID}</p>
      </section>

      <section className="cart-section">
        <h3>Current Cart</h3>
        <p>Your cart is currently empty.</p>
      </section>

      <section className="order-history-section">
        <h3>Order History</h3>
        <p>You have no past orders.</p>
      </section>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default UserProfile;
