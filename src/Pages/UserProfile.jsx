import { useState } from 'react';

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

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%'
  };

  const cellStyle = {
    border: '1px solid #000',
    padding: '4px 8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const inputStyle = {
    width: '100%',
    padding: '2px 4px',
    boxSizing: 'border-box'
  };

  return (
    <div>
      <h2>User Management</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>Phone</th>
              <th style={cellStyle}>Address</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              editingUser === user.id ? (
                <tr key={user.id}>
                  <td style={cellStyle}>
                    <input
                      style={inputStyle}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      style={inputStyle}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      style={inputStyle}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </td>
                  <td style={cellStyle}>
                    <input
                      style={inputStyle}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </td>
                  <td style={cellStyle}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id}>
                  <td style={cellStyle}>{user.name}</td>
                  <td style={cellStyle}>{user.email}</td>
                  <td style={cellStyle}>{user.phone}</td>
                  <td style={cellStyle}>{user.address}</td>
                  <td style={cellStyle}>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
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
