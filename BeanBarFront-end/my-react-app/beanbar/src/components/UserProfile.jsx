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

  // Redirect to login if no user provided
  useEffect(() => {
    if (!location.state?.user) {
      navigate("/login");
    } else {
      setUser(location.state.user);
    }
  }, [location.state, navigate]);

  // Fetch profile from backend
  useEffect(() => {
    if (!user?.customerID) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://localhost:7233/api/Users/${user.customerID}`);
        if (!res.ok) throw new Error("Profile fetch failed");

        const data = await res.json();
        setProfileData(data);
        setEditData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
    setSaveError(null);
    setSaveSuccess(false);
  };

  const hasChanges = () => {
    if (!editData || !profileData) return false;
    return (
      editData.fullName !== profileData.fullName ||
      editData.email !== profileData.email ||
      editData.phoneNumber !== profileData.phoneNumber ||
      editData.address !== profileData.address
    );
  };

  const isValid = () => {
    if (!editData) return false;
    if (!editData.fullName.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) return false;
    if (!editData.phoneNumber.trim()) return false;
    return true;
  };

  const handleSave = async () => {
    if (!isValid()) {
      setSaveError("Please fill in all required fields with valid data.");
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch(`https://localhost:7233/api/Users/${editData.customerID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setProfileData(updated);
      setEditData(updated);
      setSaveSuccess(true);
    } catch (err) {
      console.error("Save error:", err);
      setSaveError("Could not save changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/login");
    }
  };

  const { fullName = "", email = "", phoneNumber = "", address = "" } = editData || {};

  if (loading) {
    return <div className="user-profile-loading">Loading profile...</div>;
  }

  if (!user || !profileData) {
    return (
      <div className="user-profile-error">
        Profile not found. <br />
        <button onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">User Profile</h2>

      <section className="user-profile-section">
        <label className="user-profile-text">
          <strong>Name:</strong>
          <input name="fullName" value={fullName} onChange={handleChange} />
        </label>

        <label className="user-profile-text">
          <strong>Email:</strong>
          <input name="email" value={email} onChange={handleChange} />
        </label>

        <label className="user-profile-text">
          <strong>Phone:</strong>
          <input name="phoneNumber" value={phoneNumber} onChange={handleChange} />
        </label>

        <label className="user-profile-text">
          <strong>Address:</strong>
          <input name="address" value={address} onChange={handleChange} />
        </label>

        <p><strong>Customer ID:</strong> {profileData.customerID}</p>

        <button
          onClick={handleSave}
          disabled={!hasChanges() || !isValid() || saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {saveError && <p className="error">{saveError}</p>}
        {saveSuccess && <p className="success">Profile updated!</p>}
      </section>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default UserProfile;
