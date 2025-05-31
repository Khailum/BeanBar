import React, { useState, useEffect } from 'react';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/deliveries');
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
      await fetch(`http://localhost:4000/api/deliveries/${deliveryID}`, {
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
      await fetch(`http://localhost:4000/api/deliveries/${deliveryID}`, { method: 'DELETE' });
      fetchDeliveries();
    } catch (err) {
      alert('Failed to delete delivery');
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Same style as Orders page for consistency
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 16,
  };

  const thTdStyle = {
    border: '1px solid #aaa',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#eee',
    fontWeight: '600',
  };

  return (
    <div>
      <h2>Deliveries</h2>
      <button onClick={fetchDeliveries} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Delivery ID</th>
            <th style={thStyle}>Order Num</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Time</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td style={thTdStyle} colSpan="6" align="center">
                No deliveries found.
              </td>
            </tr>
          ) : (
            deliveries.map(({ deliveryID, orderNum, address, deliveryStatus, time }) => (
              <tr key={deliveryID}>
                <td style={thTdStyle}>{deliveryID}</td>
                <td style={thTdStyle}>{orderNum}</td>
                <td style={thTdStyle}>{address}</td>
                <td style={thTdStyle}>
                  <select
                    value={deliveryStatus}
                    onChange={(e) => updateStatus(deliveryID, e.target.value)}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="On the Way">On the Way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td style={thTdStyle}>{time}</td>
                <td style={thTdStyle}>
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




