import { useEffect, useState } from 'react';

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockForm, setStockForm] = useState({
    StockName: '',
    Quantity: '',
    Unit: '',
    Supplier: '',
  });
  const [editing, setEditing] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const unitOptions = ['grams', 'kilograms', 'ml', 'liters', 'units', 'bags', 'bottles'];

  const fetchStock = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/stock');
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
    const { StockName, Quantity, Unit, Supplier } = stockForm;
    if (!StockName || !Quantity || !Unit || !Supplier) return alert('Please fill all fields');

    try {
      await fetch('http://localhost:3001/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stockNum: generateMockId(),
          StockName,
          Quantity: parseFloat(Quantity),
          Unit,
          Supplier,
        }),
      });
      setStockForm({ StockName: '', Quantity: '', Unit: '', Supplier: '' });
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
    const { StockName, Quantity, Unit, Supplier } = editedData;
    if (!StockName || !Quantity || !Unit || !Supplier) return alert('Please fill all fields');

    try {
      await fetch(`http://localhost:3001/stock/${stockNum}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          StockName,
          Quantity: parseFloat(Quantity),
          Unit,
          Supplier,
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
      await fetch(`http://localhost:3001/stock/${stockNum}`, {
        method: 'DELETE',
      });
      fetchStock();
    } catch (err) {
      alert('Error deleting stock: ' + err.message);
    }
  };

  const getStatus = (quantity) => {
    if (quantity > 50) return 'Available';
    if (quantity > 20) return 'Low';
    return 'Out of Stock';
  };

  const filteredStock = stockItems.filter((item) =>
    item.StockName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simple spacing styles (inline)
  const containerStyle = { maxWidth: '900px', margin: 'auto', padding: '20px' };
  const sectionStyle = { marginBottom: '30px' };
  const inputStyle = { marginRight: '10px', marginBottom: '10px', padding: '5px' };
  const selectStyle = { marginRight: '10px', marginBottom: '10px', padding: '5px' };
  const buttonStyle = { padding: '5px 10px', marginRight: '10px' };
  const searchInputStyle = { padding: '5px', width: '300px', marginBottom: '20px' };

  return (
    <div style={containerStyle}>
      <h2>Stock Management</h2>

      <div style={sectionStyle}>
        <h3>Add Stock Item</h3>
        <input
          name="StockName"
          placeholder="Stock Name"
          value={stockForm.StockName}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="Quantity"
          type="number"
          placeholder="Quantity"
          value={stockForm.Quantity}
          onChange={handleChange}
          style={inputStyle}
        />
        <select
          name="Unit"
          value={stockForm.Unit}
          onChange={handleChange}
          style={selectStyle}
        >
          <option value="">Select Unit</option>
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <input
          name="Supplier"
          placeholder="Supplier"
          value={stockForm.Supplier}
          onChange={handleChange}
          style={inputStyle}
        />
        <br />
        <button onClick={addStock} style={buttonStyle}>
          Add
        </button>
      </div>

      <div style={sectionStyle}>
        <input
          type="text"
          placeholder="Search stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>StockNum</th>
              <th>StockName</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
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
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <input
                        name="Quantity"
                        type="number"
                        value={editedData.Quantity}
                        onChange={handleEditChange}
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td>
                      <select
                        name="Unit"
                        value={editedData.Unit}
                        onChange={handleEditChange}
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
                        name="Supplier"
                        value={editedData.Supplier}
                        onChange={handleEditChange}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>{getStatus(parseFloat(editedData.Quantity) || 0)}</td>
                    <td>
                      <button onClick={() => saveEdit(item.stockNum)} style={buttonStyle}>
                        Save
                      </button>
                      <button onClick={cancelEdit} style={buttonStyle}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.stockNum}>
                    <td>{item.stockNum}</td>
                    <td>{item.StockName}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.Unit}</td>
                    <td>{item.Supplier}</td>
                    <td>{getStatus(item.Quantity)}</td>
                    <td>
                      <button onClick={() => startEdit(item)} style={buttonStyle}>
                        Edit
                      </button>
                      <button onClick={() => deleteStock(item.stockNum)} style={buttonStyle}>
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

export default Stock;

