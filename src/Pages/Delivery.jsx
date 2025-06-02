import React, { useState, useEffect } from 'react';
import "./Delivery.css";

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/deliveries');
      if (!res.ok) throw new Error('Failed to fetch deliveries');
      const data = await res.json();
      setDeliveries(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (deliveryID, status) => {
    try {
      await fetch(`http://localhost:3000/deliveries/${deliveryID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: status }),
      });
      fetchDeliveries();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteDelivery = async (deliveryID) => {
    if (!window.confirm('Delete this delivery?')) return;
    try {
      await fetch(`http://localhost:3000/deliveries/${deliveryID}`, { method: 'DELETE' });
      fetchDeliveries();
    } catch (err) {
      alert('Failed to delete delivery');
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="deliveries-page">
      <h2>Deliveries</h2>
      <button onClick={fetchDeliveries} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
      <table className="deliveries-table">
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Order Num</th>
            <th>Address</th>
            <th>Status</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan="6" align="center" className="no-data">
                No deliveries found.
              </td>
            </tr>
          ) : (
            deliveries.map(({ deliveryID, orderNum, address, deliveryStatus, time }) => (
              <tr key={deliveryID}>
                <td>{deliveryID}</td>
                <td>{orderNum}</td>
                <td>{address}</td>
                <td>
                  <select
                    value={deliveryStatus}
                    onChange={(e) => updateStatus(deliveryID, e.target.value)}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="On the Way">On the Way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>{time}</td>
                <td>
                  <button onClick={() => deleteDelivery(deliveryID)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Deliveries;
