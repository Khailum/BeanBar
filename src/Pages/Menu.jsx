import { useState } from 'react';

const Menu = () => {
const [items, setItems] = useState([]);
const [name, setName] = useState('');
const [price, setPrice] = useState('');

const addItem = () => {
    if (!name || !price) return;
    setItems([...items, { name, price }]);
    setName('');
    setPrice('');
};

return (
    <div>
    <h2>Manage Menu</h2>
    <input placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} />
    <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
    <button onClick={addItem}>Add Item</button>
    <ul>
        {items.map((item, idx) => (
        <li key={idx}>{item.name} - R{item.price}</li>
        ))}
    </ul>
    </div>
);
};
export default Menu;