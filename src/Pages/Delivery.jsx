import { useState, useEffect } from 'react';

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/deliveries');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setDeliveries(data);
    } catch (err) {
      alert('Failed to load deliveries: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (deliveryId, status) => {
    try {
      await fetch(`http://localhost:4000/api/deliveries/${deliveryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus: status }),
      });
      fetchDeliveries();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const deleteDelivery = async (deliveryId) => {
    if (!window.confirm('Delete this delivery?')) return;
    try {
      await fetch(`http://localhost:4000/api/deliveries/${deliveryId}`, { method: 'DELETE' });
      fetchDeliveries();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div>
      <h2>Delivery</h2>
      <button onClick={fetchDeliveries} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>

      <table border="1" cellPadding="4" cellSpacing="0">
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
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No deliveries found
              </td>
            </tr>
          ) : (
            deliveries.map(({ deliveryId, orderNum, address, deliveryStatus, time }) => (
              <tr key={deliveryId}>
                <td>{deliveryId}</td>
                <td>{orderNum}</td>
                <td>{address}</td>
                <td>
                  <select
                    value={deliveryStatus}
                    onChange={(e) => updateStatus(deliveryId, e.target.value)}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="On the Way">On the Way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>{time}</td>
                <td>
                  <button onClick={() => deleteDelivery(deliveryId)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Delivery;





