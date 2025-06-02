import { useState } from 'react';
import './UserProfile.css';

const initialUsers = [
  {
    id: 1,
    name: 'Thabo M.',
    email: 'thabo@example.com',
    phone: '0831234567',
    address: '12 Coffee Lane, Cape Town'
  },
  {
    id: 2,
    name: 'Lerato K.',
    email: 'lerato@example.com',
    phone: '0749876543',
    address: '99 Espresso Ave, Joburg'
  }
];

function UserProfile() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser ? { ...formData, id: u.id } : u))
    );
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="admin-page">
      <h2>User Management</h2>

      {users.length === 0 ? (
        <p className="no-results">No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              editingUser === user.id ? (
                <tr key={user.id}>
                  <td><input name="name" value={formData.name} onChange={handleChange} className="input-field" /></td>
                  <td><input name="email" value={formData.email} onChange={handleChange} className="input-field" /></td>
                  <td><input name="phone" value={formData.phone} onChange={handleChange} className="input-field" /></td>
                  <td><input name="address" value={formData.address} onChange={handleChange} className="input-field" /></td>
                  <td>
                    <button className="action-btn" onClick={handleSave}>Save</button>
                    <button className="action-btn cancel" onClick={() => setEditingUser(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <button className="action-btn" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete(user.id)}>Delete</button>
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

export default UserProfile;
