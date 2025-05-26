import { useEffect, useState } from 'react';

const Menu = () => {
const [items, setItems] = useState([]);
const [stock, setStock] = useState([]);
const [loading, setLoading] = useState(false);
const [menuForm, setMenuForm] = useState({ name: '', type: '', description: '', price: '', image: '' });
const [stockForms, setStockForms] = useState({});

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
        const [id, name, type, description, price, image] = row.split(',');
        return { id, name, type, description, price: parseFloat(price), image };
    });

    const stockData = stockText.trim().split('\n').map(row => {
        const [StockNum, ItemID, Available_Stock, Arrival_Date] = row.split(',');
        return { StockNum, ItemID, Available_Stock: parseInt(Available_Stock), Arrival_Date };
    });

    setItems(menuData);
    setStock(stockData);
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
    const { name, type, description, price, image } = menuForm;
    if (!name || !type || !description || !price) return alert('Fill all fields');

    const body = new URLSearchParams({ name, type, description, price, image });

    try {
    const res = await fetch('http://localhost:4000/api/menu', {
        method: 'POST',
        body,
    });
    if (!res.ok) throw new Error('Failed to add menu item');
    await fetchMenu();
    setMenuForm({ name: '', type: '', description: '', price: '', image: '' });
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
    if (!form?.available_stock || !form?.arrival_date) return alert('Fill stock quantity and arrival date');

    const body = new URLSearchParams({
    itemId,
    available_stock: form.available_stock,
    arrival_date: form.arrival_date,
    });

    try {
    await fetch('http://localhost:4000/api/stock', {
        method: 'POST',
        body,
    });
    await fetchMenu();
    setStockForms((prev) => ({
        ...prev,
        [itemId]: { available_stock: '', arrival_date: '' },
    }));
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

const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
}, {});

return (
    <div>
    <h2>Menu & Stock Management</h2>
    <button onClick={fetchMenu} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh'}</button>

    <div>
        <h3>Add Menu Item</h3>
        <input placeholder="Name" name="name" value={menuForm.name} onChange={handleMenuChange} />
        <select name="type" value={menuForm.type} onChange={handleMenuChange}>
        <option value="">Select Type</option>
        <option value="Hot Beverages">Hot Beverages</option>
        <option value="Cold Beverages">Cold Beverages</option>
        <option value="Snacks">Snacks</option>
        </select>
        <input placeholder="Description" name="description" value={menuForm.description} onChange={handleMenuChange} />
        <input placeholder="Price" name="price" type="number" value={menuForm.price} onChange={handleMenuChange} />
        <input placeholder="Image URL" name="image" value={menuForm.image} onChange={handleMenuChange} />
        <button onClick={addMenuItem}>Add Item</button>
    </div>

    {Object.entries(groupedItems).map(([type, items]) => (
        <div key={type}>
        <h3>{type}</h3>
        <table border="1" cellPadding="6">
            <thead>
            <tr>
                <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Image</th><th>Stock</th><th>Add Stock</th><th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => {
                const itemStock = stock.filter((s) => s.ItemID === item.id);
                return (
                <tr key={item.id} style={{ backgroundColor: itemStock.reduce((sum, s) => sum + s.Available_Stock, 0) === 0 ? '#8B4513' : 'transparent', color: itemStock.reduce((sum, s) => sum + s.Available_Stock, 0) === 0 ? 'white' : 'black' }}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>R{item.price.toFixed(2)}</td>
                    <td>{item.image ? <img src={item.image} alt={item.name} height={40} /> : 'No image'}</td>
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
                        name="available_stock"
                        placeholder="Qty"
                        value={stockForms[item.id]?.available_stock || ''}
                        onChange={(e) => handleStockChange(e, item.id)}
                        style={{ width: 60 }}
                    /><br />
                    <input
                        type="date"
                        name="arrival_date"
                        value={stockForms[item.id]?.arrival_date || ''}
                        onChange={(e) => handleStockChange(e, item.id)}
                    /><br />
                    <button onClick={() => addStock(item.id)}>Add</button>
                    </td>
                    <td>
                    <button onClick={() => deleteMenuItem(item.id)}>Delete Item</button>
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