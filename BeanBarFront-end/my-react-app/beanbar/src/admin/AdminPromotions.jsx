import React, { useEffect, useState, useCallback } from 'react';
import './AdminPromotions.css';

function AdminPromotions() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPromotions = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch('https://localhost:7233/api/PromotionHistories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch promotions');
        }
        return response.json();
      })
      .then((data) => setPromotions(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handleDelete = (PromotionID) => {
    if (!window.confirm('Are you sure you want to delete this promotion?')) return;

    fetch(`https://localhost:7233/api/PromotionHistories/${PromotionID}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete promotion');
        }
        setPromotions((prev) => prev.filter((promo) => promo.PromotionID !== PromotionID));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="promotions-page">
      <h2 className="page-title">Promotions</h2>

      <button className="refresh-button" onClick={fetchPromotions} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>

      {error && <p className="error-message">Error: {error}</p>}

      <table className="promotions-table">
        <thead>
          <tr>
            <th>PromotionID</th>
            <th>CustomerID</th>
            <th>RefreshTokenID</th>
            <th>PromotionType</th>
            <th>PromotionValue</th>
            <th>PromotionDate</th>
            <th>Notes</th>
            <th>Used</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="table-message">Loading promotions...</td>
            </tr>
          ) : promotions.length === 0 ? (
            <tr>
              <td colSpan="9" className="table-message">No promotions found.</td>
            </tr>
          ) : (
            promotions.map((promo) => (
              <tr key={promo.PromotionID}>
                <td>{promo.PromotionID}</td>
                <td>{promo.CustomerID}</td>
                <td>{promo.RefreshTokenID}</td>
                <td>{promo.PromotionType}</td>
                <td>{promo.PromotionValue}</td>
                <td>{promo.PromotionDate}</td>
                <td>{promo.Notes}</td>
                <td>{promo.Used ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleDelete(promo.PromotionID)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPromotions;
