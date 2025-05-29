import { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/orders');
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
      await fetch(`http://localhost:4000/api/orders/${orderNum}`, {
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
      await fetch(`http://localhost:4000/api/orders/${orderNum}`, { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <button onClick={fetchOrders} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>

      <table border="1" cellPadding="4" cellSpacing="0">
        <thead>
          <tr>
            <th>Order Num</th>
            <th>Customer ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No orders found
              </td>
            </tr>
          ) : (
            orders.map(({ orderNum, customerID, date, orderStatus, totalPrice }) => (
              <tr key={orderNum}>
                <td>{orderNum}</td>
                <td>{customerID}</td>
                <td>{date}</td>
                <td>
                  <select
                    value={orderStatus}
                    onChange={(e) => updateStatus(orderNum, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{totalPrice}</td>
                <td>
                  <button onClick={() => deleteOrder(orderNum)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;


