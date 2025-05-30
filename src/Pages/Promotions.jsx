import React, { useEffect, useState } from 'react';

function Promotions() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/promotions')
      .then(response => response.json())
      .then(data => setPromotions(data))
      .catch(error => console.error('Error fetching promotions:', error));
  }, []);

  const handleDelete = (promotionID) => {
    fetch(`http://localhost:5000/api/promotions/${promotionID}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setPromotions(prev => prev.filter(promo => promo.PromotionID !== promotionID));
        } else {
          console.error('Failed to delete promotion');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Promotions</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>PromotionID</th>
            <th>CustomerID</th>
            <th>RefreshTokenID</th>
            <th>PromotionType</th>
            <th>PromotionValue</th>
            <th>PromotionDate</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map(promo => (
            <tr key={promo.PromotionID}>
              <td>{promo.PromotionID}</td>
              <td>{promo.CustomerID}</td>
              <td>{promo.RefreshTokenID}</td>
              <td>{promo.PromotionType}</td>
              <td>{promo.PromotionValue}</td>
              <td>{promo.PromotionDate}</td>
              <td>{promo.Notes}</td>
              <td>
                <button onClick={() => handleDelete(promo.PromotionID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Promotions;




