// UserProfile.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const userData = location.state;

  if (!userData) {
    return (
      <div>
        <h2>User not found</h2>
        <button onClick={() => navigate('/register')}>Go to Register</button>
      </div>
    );
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>ID Number:</strong> {userData.idNumber}</p>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      <p><strong>Address:</strong> {userData.address || 'N/A'}</p>
    </div>
  );
}

export default UserProfile;
