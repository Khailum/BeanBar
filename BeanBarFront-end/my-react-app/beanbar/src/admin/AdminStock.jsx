import { useEffect, useState } from 'react';
import './AdminStock.css';
 
const AdminStock = () => {
const [stockItems, setStockItems] = useState([]);
const [loading, setLoading] = useState(false);
const [stockForm, setStockForm] = useState({
StockName: '',
Available_Stock: '',
Unit: '',
SupplierName: '',
});
const [editing, setEditing] = useState(null);
const [editedData, setEditedData] = useState({});
const [searchTerm, setSearchTerm] = useState('');
 
const unitOptions = ['grams', 'kilograms', 'ml', 'liters', 'units', 'bags', 'bottles'];
 
const fetchStock = async () => {
setLoading(true);
try {
    const res = await fetch('https://localhost:7233/api/Stocks');
    const data = await res.json();
    setStockItems(data);
} catch (err) {
    alert('Error fetching stock: ' + err.message);
} finally {
    setLoading(false);
}
};
 
useEffect(() => {
fetchStock();
}, []);
 
const handleChange = (e) => {
const { name, value } = e.target;
setStockForm((prev) => ({ ...prev, [name]: value }));
};
 
const generateMockId = () => {
const maxId = stockItems.reduce((max, item) => Math.max(max, item.stockNum || 0), 0);
return maxId + 1;
};
 
const addStock = async () => {
  const { StockName, Available_Stock, Unit, SupplierName } = stockForm;
  if (!StockName || !Available_Stock || !Unit || !SupplierName) {
    return alert('Please fill all fields');
  }
 
  try {
    await fetch('https://localhost:7233/api/Stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stockNum: generateMockId(),
        StockName,
        Available_Stock: parseFloat(Available_Stock),
        Unit,
        SupplierName,
        Arrival_Date: new Date().toISOString() // Optional: sets arrival date to now
      }),
    });
    setStockForm({ StockName: '', Available_Stock: '', Unit: '', SupplierName: '' });
    fetchStock();
  } catch (err) {
    alert('Error adding stock: ' + err.message);
  }
};
 
 
const startEdit = (item) => {
setEditing(item.stockNum);
setEditedData(item);
};
 
const handleEditChange = (e) => {
const { name, value } = e.target;
setEditedData((prev) => ({ ...prev, [name]: value }));
};
 
const saveEdit = async (stockNum) => {
const { StockName, Available_Stock, Unit, SupplierName } = editedData;
if (!StockName || !Available_Stock || !Unit || !SupplierName) return alert('Please fill all fields');
 
try {
    await fetch(`https://localhost:7233/api/Stocks/${stockNum}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        StockName,
        Available_Stock: parseFloat(Available_Stock),
        Unit,
        SupplierName,
    }),
    });
    setEditing(null);
    fetchStock();
} catch (err) {
    alert('Error updating stock: ' + err.message);
}
};
 
const cancelEdit = () => {
setEditing(null);
setEditedData({});
};
 
const deleteStock = async (stockNum) => {
if (!window.confirm('Delete this stock item?')) return;
try {
    await fetch(`https://localhost:7233/api/Stocks/${stockNum}`, {
    method: 'DELETE',
    });
    fetchStock();
} catch (err) {
    alert('Error deleting stock: ' + err.message);
}
};
 
const getStatus = (Available_Stock) => {
if (Available_Stock > 50) return 'Available';
if (Available_Stock > 20) return 'Low';
return 'Out of Stock';
};
 
const filteredStock = stockItems.filter((item) =>
item.StockName.toLowerCase().includes(searchTerm.toLowerCase())
);
 
return (
<div className="stock-page">
    <h2>Stock Management</h2>
 
    <div className="stock-section add-stock-section">
    <h3>Add Stock Item</h3>
    <input
  name="StockName"
  value={editedData.StockName}
  onChange={handleEditChange}
  className="stock-edit-input"
/>
<input
  name="Available_Stock"
  type="number"
  value={editedData.Available_Stock}
  onChange={handleEditChange}
  className="stock-edit-input quantity-input"
/>
<select
  name="Unit"
  value={editedData.Unit}
  onChange={handleEditChange}
  className="stock-edit-select"
>
  {unitOptions.map((unit) => (
    <option key={unit} value={unit}>
      {unit}
    </option>
  ))}
</select>
<input
  name="SupplierName"
  value={editedData.SupplierName}
  onChange={handleEditChange}
  className="stock-edit-input"
/>
 
    <br />
    <button onClick={addStock} className="stock-button">
        Add
    </button>
    </div>
 
    <div className="stock-section search-section">
    <input
        type="text"
        placeholder="Search stock..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="stock-search-input"
    />
    </div>
 
    {loading ? (
    <p>Loading stock data...</p>
    ) : (
    <table className="stock-table">
        <thead>
        <tr>
            <th>StockNum</th>
            <th>StockName</th>
            <th>Available_Stock</th>
            <th>Unit</th>
            <th>SupplierName</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {filteredStock.length === 0 ? (
            <tr>
            <td colSpan="7" className="no-data">
                No stock items found.
            </td>
            </tr>
        ) : (
            filteredStock.map((item) =>
            editing === item.stockNum ? (
                <tr key={item.stockNum}>
                <td>{item.stockNum}</td>
                <td>
                    <input
                    name="StockName"
                    value={editedData.StockName}
                    onChange={handleEditChange}
                    className="stock-edit-input"
                    />
                </td>
                <td>
                    <input
                    name="Available_Stock"
                    type="number"
                    value={editedData.Quantity}
                    onChange={handleEditChange}
                    className="stock-edit-input quantity-input"
                    />
                </td>
                <td>
                    <select
                    name="Unit"
                    value={editedData.Unit}
                    onChange={handleEditChange}
                    className="stock-edit-select"
                    >
                    {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                        {unit}
                        </option>
                    ))}
                    </select>
                </td>
                <td>
                    <input
                    name="SupplierName"
                    value={editedData.Supplier}
                    onChange={handleEditChange}
                    className="stock-edit-input"
                    />
                </td>
                <td>{getStatus(parseFloat(editedData.Quantity) || 0)}</td>
                <td>
                    <button onClick={() => saveEdit(item.stockNum)} className="stock-button">
                    Save
                    </button>
                    <button onClick={cancelEdit} className="stock-button cancel-button">
                    Cancel
                    </button>
                </td>
                </tr>
            ) : (
                <tr key={item.stockNum}>
                <td>{item.stockNum}</td>
                <td>{item.StockName}</td>
                <td>{item.Available_Stock}</td>
                <td>{item.Unit}</td>
                <td>{item.SupplierName}</td>
                <td>{getStatus(item.Available_Stock)}</td>
                <td>
                    <button onClick={() => startEdit(item)} className="stock-button">
                    Edit
                    </button>
                    <button onClick={() => deleteStock(item.stockNum)} className="stock-button cancel-button">
                    Delete
                    </button>
                </td>
                </tr>
            )
            )
        )}
        </tbody>
    </table>
    )}
</div>
);
};
 
export default AdminStock;