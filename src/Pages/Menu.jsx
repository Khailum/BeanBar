import { useEffect, useState } from 'react';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuForm, setMenuForm] = useState({ ItemName: '', Category: '', ItemType: '', ItemDescription: '', Price: '', ImageUrl: '' });
  const [stockForms, setStockForms] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const [menuRes, stockRes] = await Promise.all([
        fetch('http://localhost:4000/api/menu'),
        fetch('http://localhost:4000/api/stock'),
      ]);
      const menuText = await menuRes.text();
      const stockText = await stockRes.text();

      const menuData = menuText.trim().split('\n').map(row => {
        const [ItemID, ItemName, Category, ItemType, ItemDescription, Price, IsAvailable, ImageUrl] = row.split(',');
        return { ItemID, ItemName, Category, ItemType, ItemDescription, Price: parseFloat(Price), IsAvailable, ImageUrl };
      });

      const stockData = stockText.trim().split('\n').map(row => {
        const [StockNum, ItemID, Available_Stock, Arrival_Date, StockStatus, Unit, SupplierName] = row.split(',');
        return { StockNum, ItemID, Available_Stock: parseInt(Available_Stock), Arrival_Date, StockStatus, Unit, SupplierName };
      });

      setItems(menuData);
      setStock(stockData);
    } catch (err) {
      alert('Error fetching data: ' + err.message);
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
    const { ItemName, Category, ItemType, ItemDescription, Price, ImageUrl } = menuForm;
    if (!ItemName || !Category || !ItemType || !ItemDescription || !Price) return alert('Fill all fields');

    const body = new URLSearchParams({ ItemName, Category, ItemType, ItemDescription, Price, ImageUrl });

    try {
      const res = await fetch('http://localhost:4000/api/menu', {
        method: 'POST',
        body,
      });
      if (!res.ok) throw new Error('Failed to add menu item');
      await fetchMenu();
      setMenuForm({ ItemName: '', Category: '', ItemType: '', ItemDescription: '', Price: '', ImageUrl: '' });
    } catch (err) {
      alert('Error adding menu item: ' + err.message);
    }
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm('Delete this item and its stock?')) return;
    try {
      await fetch(`http://localhost:4000/api/menu/${id}`, { method: 'DELETE' });
      await fetchMenu();
    } catch (err) {
      alert('Error deleting item: ' + err.message);
    }
  };

  const handleStockChange = (e, itemId) => {
    const { name, value } = e.target;
    setStockForms((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], [name]: value },
    }));
  };

  const addStock = async (itemId) => {
    const form = stockForms[itemId];
    if (!form?.Available_Stock || !form?.Arrival_Date) return alert('Fill stock quantity and arrival date');

    const body = new URLSearchParams({
      itemId,
      available_stock: form.Available_Stock,
      arrival_date: form.Arrival_Date,
    });

    try {
      await fetch('http://localhost:4000/api/stock', {
        method: 'POST',
        body,
      });
      await fetchMenu();
      setStockForms((prev) => ({ ...prev, [itemId]: { Available_Stock: '', Arrival_Date: '' } }));
    } catch (err) {
      alert('Error adding stock: ' + err.message);
    }
  };

  const deleteStock = async (stockNum) => {
    if (!window.confirm('Delete this stock entry?')) return;
    try {
      await fetch(`http://localhost:4000/api/stock/${stockNum}`, { method: 'DELETE' });
      await fetchMenu();
    } catch (err) {
      alert('Error deleting stock: ' + err.message);
    }
  };

  const editStock = async (stockNum, field, value) => {
    const body = new URLSearchParams({ field, value });
    try {
      await fetch(`http://localhost:4000/api/stock/${stockNum}`, {
        method: 'PATCH',
    body,
    });
    setStock((prev) =>
    prev.map((s) => (s.StockNum === stockNum ? { ...s, [field]: field === 'Available_Stock' ? parseInt(value) : value } : s))
    );
} catch (err) {
    alert('Error updating stock: ' + err.message);
}
};

const filteredItems = items.filter(item =>
item.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
item.ItemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
item.Category.toLowerCase().includes(searchTerm.toLowerCase())
);

const groupedItems = filteredItems.reduce((acc, item) => {
if (!acc[item.Category]) acc[item.Category] = [];
acc[item.Category].push(item);
return acc;
}, {});

return (
<div>
    <h2>Menu & Stock Management</h2>
    <button onClick={fetchMenu} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh'}</button>

    <input
    type="text"
    placeholder="Search menu or stock..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ margin: '10px 0', padding: '6px', width: '100%' }}
    />

    <div>
    <h3>Add Menu Item</h3>
    <input placeholder="Item Name" name="ItemName" value={menuForm.ItemName} onChange={handleMenuChange} />
    <input placeholder="Category" name="Category" value={menuForm.Category} onChange={handleMenuChange} />
    <select name="ItemType" value={menuForm.ItemType} onChange={handleMenuChange}>
        <option value="">Select Type</option>
        <option value="Hot">Hot</option>
        <option value="Cold">Cold</option>
        <option value="Snack">Snack</option>
    </select>
    <input placeholder="Description" name="ItemDescription" value={menuForm.ItemDescription} onChange={handleMenuChange} />
    <input placeholder="Price" name="Price" type="number" value={menuForm.Price} onChange={handleMenuChange} />
    <input placeholder="Image URL" name="ImageUrl" value={menuForm.ImageUrl} onChange={handleMenuChange} />
    <button onClick={addMenuItem}>Add Item</button>
    </div>

    {Object.entries(groupedItems).map(([category, items]) => (
    <div key={category}>
        <h3>{category}</h3>
        <table border="1" cellPadding="6">
        <thead>
            <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Image</th><th>Stock</th><th>Add Stock</th><th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item) => {
            const itemStock = stock.filter((s) => s.ItemID === item.ItemID);
            return (
                <tr key={item.ItemID} style={{ backgroundColor: itemStock.reduce((sum, s) => sum + s.Available_Stock, 0) === 0 ? '#8B4513' : 'transparent', color: itemStock.reduce((sum, s) => sum + s.Available_Stock, 0) === 0 ? 'white' : 'black' }}>
                <td>{item.ItemID}</td>
                <td>{item.ItemName}</td>
                <td>{item.ItemDescription}</td>
                <td>R{item.Price.toFixed(2)}</td>
                <td>{item.ImageUrl ? <img src={item.ImageUrl} alt={item.ItemName} height={40} /> : 'No image'}</td>
                <td>
                    {itemStock.length === 0 ? (
                    <i>No stock</i>
                    ) : (
                    <table>
                        <thead><tr><th>#</th><th>Qty</th><th>Date</th><th>Delete</th></tr></thead>
                        <tbody>
                        {itemStock.map((s) => (
                            <tr key={s.StockNum}>
                            <td>{s.StockNum}</td>
                            <td>
                                <input
                                type="number"
                                value={s.Available_Stock}
                                onChange={(e) => editStock(s.StockNum, 'Available_Stock', e.target.value)}
                                style={{ width: 50 }}
                                />
                            </td>
                            <td>
                                <input
                                type="date"
                                value={s.Arrival_Date}
                                onChange={(e) => editStock(s.StockNum, 'Arrival_Date', e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => deleteStock(s.StockNum)}>Delete</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )}
                </td>
                <td>
                    <input
                    type="number"
                    name="Available_Stock"
                    placeholder="Qty"
                    value={stockForms[item.ItemID]?.Available_Stock || ''}
                    onChange={(e) => handleStockChange(e, item.ItemID)}
                    style={{ width: 60 }}
                    /><br />
                    <input
                    type="date"
                    name="Arrival_Date"
                    value={stockForms[item.ItemID]?.Arrival_Date || ''}
                    onChange={(e) => handleStockChange(e, item.ItemID)}
                    /><br />
                    <button onClick={() => addStock(item.ItemID)}>Add</button>
                </td>
                <td>
                    <button onClick={() => deleteMenuItem(item.ItemID)}>Delete Item</button>
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>
    ))}
</div>
);
};

export default Menu;
