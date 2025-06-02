import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!user && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!user?.customerID) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`http://localhost:3000/userprofile?customerID=${user.customerID}`);
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();

        if (data.length > 0) {
          setProfileData(data[0]);
          setEditData(data[0]);
        } else {
          const createRes = await fetch(`http://localhost:3000/userprofile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerID: user.customerID,
              fullName: user.fullName || "",
              email: user.email || "",
              phoneNumber: user.phoneNumber || "",
              address: "",
            }),
          });

          if (!createRes.ok) throw new Error("Failed to create user profile");
          const newProfile = await createRes.json();

          setProfileData(newProfile);
          setEditData(newProfile);
        }
      } catch (error) {
        console.error("Error fetching or creating user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateProfile();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    if (!editData) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch(`http://localhost:3000/userprofile/${editData.customerID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const updatedProfile = await res.json();
      setProfileData(updatedProfile);
      setEditData(updatedProfile);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError("Failed to save profile. Please try again.");
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="user-profile-loading">Loading user profile...</div>;

  if (!user || !profileData) {
    return (
      <div className="user-profile-error">
        No user data found. <br />
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">User Profile</h2>

      <section className="user-profile-section">
        <h3 className="user-profile-section-title">Customer Information</h3>

        <label className="user-profile-text" htmlFor="fullName">
          <strong>Name:</strong>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={editData?.fullName || ""}
            onChange={handleChange}
            className="user-profile-input"
          />
        </label>

        <label className="user-profile-text" htmlFor="email">
          <strong>Email:</strong>
          <input
            type="email"
            id="email"
            name="email"
            value={editData?.email || ""}
            onChange={handleChange}
            className="user-profile-input"
          />
        </label>

        <label className="user-profile-text" htmlFor="phoneNumber">
          <strong>Phone:</strong>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={editData?.phoneNumber || ""}
            onChange={handleChange}
            className="user-profile-input"
          />
        </label>

        <label className="user-profile-text" htmlFor="address">
          <strong>Address:</strong>
          <input
            type="text"
            id="address"
            name="address"
            value={editData?.address || ""}
            onChange={handleChange}
            className="user-profile-input"
          />
        </label>

        <p className="user-profile-text">
          <strong>Customer ID:</strong> {profileData.customerID}
        </p>

        <button
          className="user-profile-save-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {saveError && <p className="user-profile-save-error">{saveError}</p>}
        {saveSuccess && <p className="user-profile-save-success">Profile updated successfully!</p>}
      </section>

      <section className="user-profile-section">
        <h3 className="user-profile-section-title">Current Cart</h3>
        <p className="user-profile-text">Your cart is currently empty.</p>
      </section>

      <section className="user-profile-section">
        <h3 className="user-profile-section-title">Order History</h3>
        <p className="user-profile-text">You have no past orders.</p>
      </section>

      <button className="user-profile-logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default UserProfile;
