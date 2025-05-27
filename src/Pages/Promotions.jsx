import { useState } from 'react';

const Promotions = () => {
  const [promo, setPromo] = useState('');
  const [list, setList] = useState([]);
  const [customerID, setCustomerID] = useState('');
  const [discount, setDiscount] = useState(0);

  const addPromo = () => {
    if (!promo) return;
    setList([...list, promo]);
    setPromo('');
  };

  const calculateDiscount = () => {
    if (!customerID) return;

    const birthDate = extractBirthdayFromID(customerID);
    if (!birthDate) return alert('Invalid ID number');

    const today = new Date();
    const isBirthday =
      today.getDate() === birthDate.getDate() &&
      today.getMonth() === birthDate.getMonth();

    if (isBirthday) {
      setDiscount(15); // 15% birthday discount
    } else {
      setDiscount(0);
    }
  };

  const extractBirthdayFromID = (id) => {
    if (!/^\d{13}$/.test(id)) return null;

    const year = parseInt(id.slice(0, 2), 10);
    const month = parseInt(id.slice(2, 4), 10) - 1;
    const day = parseInt(id.slice(4, 6), 10);

    const fullYear = year > 20 ? 1900 + year : 2000 + year;
    return new Date(fullYear, month, day);
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

    <hr />
    <h3>Check Birthday Discount</h3>
    <input
        type="text"
        placeholder="Customer ID Number"
        value={customerID}
        onChange={(e) => setCustomerID(e.target.value)}
    />
    <button onClick={calculateDiscount}>Check Discount</button>
    {discount > 0 && <p>🎉 {discount}% Birthday Discount Applied!</p>}
    {discount === 0 && customerID && <p>No discount today.</p>}
</div>
);
};

export default Promotions;
