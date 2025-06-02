import { useState, useEffect } from 'react';
import './Orders.css';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/orders');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      alert('Failed to load orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderNum, status) => {
    try {
      await fetch(`http://localhost:3000/orders/${orderNum}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: status }),
      });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const deleteOrder = async (orderNum) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await fetch(`http://localhost:3000/orders/${orderNum}`, {
        method: 'DELETE',
      });
      fetchOrders();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Orders</h2>
        <button
          className="refresh-button"
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? (
            <span className="loading">Loading...</span>
          ) : (
            'Refresh'
          )}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
          <button className="gold-button" onClick={fetchOrders}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Num</th>
                <th>ItemID</th>
                <th>Customer ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(
                ({ orderNum, ItemID, customerID, date, orderStatus, totalPrice }) => (
                  <tr key={orderNum}>
                    <td className="order-num">{orderNum}</td>
                    <td>{ItemID}</td>
                    <td>{customerID}</td>
                    <td>{date}</td>
                    <td className="status-selector">
                      <span
                        className={`status-icon ${
                          orderStatus === 'Completed'
                            ? 'completed'
                            : orderStatus === 'Cancelled'
                            ? 'cancelled'
                            : 'pending'
                        }`}
                      >
                        ●
                      </span>
                      <select
                        value={orderStatus}
                        onChange={(e) => updateStatus(orderNum, e.target.value)}
                        className={`status-select status-${orderStatus.toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="price">{totalPrice}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteOrder(orderNum)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;



