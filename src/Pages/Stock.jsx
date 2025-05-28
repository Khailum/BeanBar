import { useEffect, useState } from 'react';

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockForm, setStockForm] = useState({
    StockName: '',
    Quantity: '',
    Unit: '',
  });
  const [editing, setEditing] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const unitOptions = ['grams', 'kilograms', 'ml', 'liters', 'units', 'bags', 'bottles'];

  const fetchStock = async () => {
    try {
      setLoading(true);
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
    const { StockName, Quantity, Unit } = stockForm;
    if (!StockName || !Quantity || !Unit) return alert('Please fill all fields');

    try {
      await fetch('http://localhost:3001/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stockNum: generateMockId(),
          StockName,
          Quantity: parseFloat(Quantity),
          Unit,
        }),
      });
      setStockForm({ StockName: '', Quantity: '', Unit: '' });
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
    try {
      await fetch(`http://localhost:3001/stock/${stockNum}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editedData,
          Quantity: parseFloat(editedData.Quantity),
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

  const filteredStock = stockItems.filter(item =>
    item.StockName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Stock Management</h2>

      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h3>Add Stock Item</h3>
            <input name="StockName" placeholder="Stock Name" value={stockForm.StockName} onChange={handleChange} />
            <input name="Quantity" type="number" placeholder="Quantity" value={stockForm.Quantity} onChange={handleChange} />
            <select name="Unit" value={stockForm.Unit} onChange={handleChange}>
              <option value="">Select Unit</option>
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <button onClick={addStock}>Add</button>
          </div>

          <h3>Available Stock</h3>
          <input
            type="text"
            placeholder="Search stock..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '10px' }}
          />

          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid black' }}>StockNum</th>
                <th style={{ border: '1px solid black' }}>StockName</th>
                <th style={{ border: '1px solid black' }}>Quantity</th>
                <th style={{ border: '1px solid black' }}>Unit</th>
                <th style={{ border: '1px solid black' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((item) =>
                editing === item.stockNum ? (
                  <tr key={item.stockNum}>
                    <td style={{ border: '1px solid black' }}>{item.stockNum}</td>
                    <td style={{ border: '1px solid black' }}>
                      <input name="StockName" value={editedData.StockName} onChange={handleEditChange} />
                    </td>
                    <td style={{ border: '1px solid black' }}>
                      <input name="Quantity" type="number" value={editedData.Quantity} onChange={handleEditChange} />
                    </td>
                    <td style={{ border: '1px solid black' }}>
                      <select name="Unit" value={editedData.Unit} onChange={handleEditChange}>
                        {unitOptions.map((unit) => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ border: '1px solid black' }}>
                      <button onClick={() => saveEdit(item.stockNum)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.stockNum}>
                    <td style={{ border: '1px solid black' }}>{item.stockNum}</td>
                    <td style={{ border: '1px solid black' }}>{item.StockName}</td>
                    <td style={{ border: '1px solid black' }}>{item.Quantity}</td>
                    <td style={{ border: '1px solid black' }}>{item.Unit}</td>
                    <td style={{ border: '1px solid black' }}>
                      <button onClick={() => startEdit(item)}>Edit</button>
                      <button onClick={() => deleteStock(item.stockNum)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Stock;
