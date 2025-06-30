import { useState, useEffect } from 'react';
import './AdminUserProfile.css';

function AdminUserProfile() {
  const [users, setUsers] = useState([]);
  const [editingEmail, setEditingEmail] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    Address: '',
    UserRole: '',
    IsActive: true,
    CustomerID: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://localhost:7233/api/Users'; // 🔁 Adjust this if needed

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingEmail(user.email);
    setFormData(user);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.email === editingEmail ? { ...formData } : u))
    );
    setEditingEmail(null);
  };

  const handleDelete = (email) => {
    setUsers((prev) => prev.filter((u) => u.email !== email));
  };

  return (
    <div className="admin-page">
      <h2>User Management</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && users.length === 0 ? (
        <p className="no-results">No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>User Role</th>
              <th>Active</th>
              <th>Customer ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              editingEmail === user.email ? (
                <tr key={user.email}>
                  <td>
                    <input
                      name="FullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </td>
                  <td>{formData.Email}</td>
                  <td>
                    <input
                      name="PhoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </td>
                  <td>
                    <input
                      name="Address"
                      value={formData.Address}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </td>
                  <td>
                    <select
                      name="UserRole"
                      value={formData.UserRole}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="IsActive"
                      checked={formData.IsActive}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="CustomerID"
                      value={formData.CustomerID}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </td>
                  <td>
                    <button className="action-btn" onClick={handleSave}>Save</button>
                    <button className="action-btn cancel" onClick={() => setEditingEmail(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user.Email}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.address}</td>
                  <td>{user.UserRole}</td>
                  <td>{user.isActive ? 'Yes' : 'No'}</td>
                  <td>{user.customerID}</td>
                  <td>
                    <button className="action-btn" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete(user.email)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminUserProfile;
