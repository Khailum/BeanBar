import { useState, useEffect } from 'react';
import './AdminDelivery.css';

const AdminDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://localhost:7233/api/Deliveries');
      if (!res.ok) throw new Error('Failed to fetch deliveries');
      setDeliveries(await res.json());
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`https://localhost:7233/api/Deliveries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DeliveryStatus: status }),
      });
      fetchDeliveries();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteDelivery = async (id) => {
    if (!window.confirm('Delete this delivery?')) return;
    try {
      await fetch(`https://localhost:7233/api/Deliveries/${id}`, { method: 'DELETE' });
      fetchDeliveries();
    } catch (err) {
      alert('Failed to delete delivery');
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Deliveries</h2>
        <button className="refresh-button" onClick={fetchDeliveries} disabled={loading}>
          {loading ? <span className="loading">Loading...</span> : 'Refresh'}
        </button>
      </div>

      {deliveries.length === 0 ? (
        <div className="no-orders">
          <p>No deliveries found</p>
          <button className="gold-button" onClick={fetchDeliveries}>Try Again</button>
        </div>
      ) : (
        <div className="orders-table-container">
          <table class="orders-table">
  <thead>
    <tr>
      <th>Delivery ID</th>
      <th>Order Number</th>
      <th>Address</th>
      <th>Status</th>
      <th>ETA</th>
      <th>Actions</th>
    </tr>
  </thead>

            <tbody>
              {deliveries.map(({ DeliveryID, OrderNum, DeliveryAddress, DeliveryStatus, EstimatedTime }) => (
                <tr key={DeliveryID}>
                  <td className="order-num">{DeliveryID}</td>
                  <td>{OrderNum}</td>
                  <td>{DeliveryAddress}</td>
                  <td className="status-selector">
                    <span
                      className={`status-icon ${
                        DeliveryStatus === 'Delivered'
                          ? 'completed'
                          : DeliveryStatus === 'Preparing'
                          ? 'pending'
                          : 'cancelled'
                      }`}
                    >
                      ●
                    </span>
                    <select
                      value={DeliveryStatus}
                      onChange={(e) => updateStatus(DeliveryID, e.target.value)}
                      className={`status-select status-${DeliveryStatus.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <option value="Preparing">Preparing</option>
                      <option value="On the Way">On the Way</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="price">{EstimatedTime}</td>
                  <td>
                    <button className="delete-button" onClick={() => deleteDelivery(DeliveryID)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDeliveries;
