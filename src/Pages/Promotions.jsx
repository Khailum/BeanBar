import { useState } from 'react';

const Promotions = () => {
const [promo, setPromo] = useState('');
const [list, setList] = useState([]);

const addPromo = () => {
    if (!promo) return;
    setList([...list, promo]);
    setPromo('');
};

return (
    <div>
    <h2>Promotions</h2>
    <input
        type="text"
        placeholder="New promotion"
        value={promo}
        onChange={(e) => setPromo(e.target.value)}
    />
    <button onClick={addPromo}>Add Promotion</button>
    <ul>
        {list.map((item, idx) => (
        <li key={idx}>{item}</li>
        ))}
    </ul>
    </div>
);
};

export default Promotions;