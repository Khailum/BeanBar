import { useEffect, useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [menuForm, setMenuForm] = useState({
    ItemName: '',
    ItemType: '',
    ItemDescription: '',
    Price: '',
    ImageUrl: '',
  });
  const [editing, setEditing] = useState(null);
  const [editedData, setEditedData] = useState({});

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/menu');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      alert('Error fetching menu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setMenuForm((prev) => ({ ...prev, [name]: value }));
  };

  const addMenuItem = async () => {
    const { ItemName, ItemType, ItemDescription, Price, ImageUrl } = menuForm;
    if (!ItemName || !ItemType || !ItemDescription || !Price) {
      return alert('Fill all required fields');
    }

    try {
      const res = await fetch('http://localhost:3001/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ItemName,
          ItemType,
          ItemDescription,
          Price: parseFloat(Price),
          ImageUrl,
        }),
      });

      if (!res.ok) throw new Error('Failed to add item');
      setMenuForm({ ItemName: '', ItemType: '', ItemDescription: '', Price: '', ImageUrl: '' });
      fetchMenu();
    } catch (err) {
      alert('Error adding item: ' + err.message);
    }
  };

  const startEditing = (item) => {
    setEditing(item.ItemID);
    setEditedData(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (itemId) => {
    try {
      await fetch(`http://localhost:3001/menu/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editedData,
          Price: parseFloat(editedData.Price),
        }),
      });
      setEditing(null);
      fetchMenu();
    } catch (err) {
      alert('Error updating item: ' + err.message);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditedData({});
  };

  const deleteItem = async (itemId) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await fetch(`http://localhost:3001/menu/${itemId}`, {
        method: 'DELETE',
      });
      fetchMenu();
    } catch (err) {
      alert('Error deleting item: ' + err.message);
    }
  };

  const groupedItems = items
    .filter((item) =>
      item.ItemName.toLowerCase().includes(search.toLowerCase()) ||
      item.ItemDescription.toLowerCase().includes(search.toLowerCase())
    )
    .reduce((groups, item) => {
      const group = item.ItemType || 'Other';
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
      return groups;
    }, {});

  return (
    <div className="menu-page">
      <h2 className="menu-title">Menu Management</h2>

      <div className="add-item-form">
        <h3>Add New Item</h3>
        <input name="ItemName" placeholder="Name" value={menuForm.ItemName} onChange={handleMenuChange} />
        <select name="ItemType" value={menuForm.ItemType} onChange={handleMenuChange}>
          <option value="">Select Type</option>
          <option value="Hot">Hot</option>
          <option value="Cold">Cold</option>
          <option value="Snack">Snack</option>
        </select>
        <input name="ItemDescription" placeholder="Description" value={menuForm.ItemDescription} onChange={handleMenuChange} />
        <input name="Price" type="number" placeholder="Price" value={menuForm.Price} onChange={handleMenuChange} />
        <input name="ImageUrl" placeholder="Image URL" value={menuForm.ImageUrl} onChange={handleMenuChange} />
        <button onClick={addMenuItem}>Add Item</button>
      </div>

      <h3>Menu Items</h3>
      <div className="search-refresh">
        <input
          placeholder="Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchMenu} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {Object.entries(groupedItems).map(([category, group]) => (
        <div key={category}>
          <h4>{category}</h4>
          <table className="menu-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Type</th><th>Description</th><th>Price</th><th>Image</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {group.map((item) =>
                editing === item.ItemID ? (
                  <tr key={item.ItemID}>
                    <td>{item.ItemID}</td>
                    <td><input name="ItemName" value={editedData.ItemName} onChange={handleEditChange} /></td>
                    <td>
                      <select name="ItemType" value={editedData.ItemType} onChange={handleEditChange}>
                        <option value="Hot">Hot</option>
                        <option value="Cold">Cold</option>
                        <option value="Snack">Snack</option>
                      </select>
                    </td>
                    <td><input name="ItemDescription" value={editedData.ItemDescription} onChange={handleEditChange} /></td>
                    <td><input name="Price" type="number" value={editedData.Price} onChange={handleEditChange} /></td>
                    <td><input name="ImageUrl" value={editedData.ImageUrl} onChange={handleEditChange} /></td>
                    <td>
                      <button onClick={() => saveEdit(item.ItemID)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.ItemID}>
                    <td>{item.ItemID}</td>
                    <td>{item.ItemName}</td>
                    <td>{item.ItemType}</td>
                    <td>{item.ItemDescription}</td>
                    <td>R{parseFloat(item.Price).toFixed(2)}</td>
                    <td>{item.ImageUrl ? <img src={item.ImageUrl} alt={item.ItemName} height={40} /> : 'No image'}</td>
                    <td>
                      <button onClick={() => startEditing(item)}>Edit</button>
                      <button onClick={() => deleteItem(item.ItemID)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Menu;

