import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/orders');
      const text = await res.text();
      const rows = text.trim().split('\n');
      const data = rows.map(row => {
        const [orderNum, itemID, customerID, address, date, orderType, quantity, orderStatus, totalPrice] = row.split(',');
        return { orderNum, itemID, customerID, address, date, orderType, quantity, orderStatus, totalPrice };
      });
      setOrders(data);
    } catch (err) {
      alert('Failed to load orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (orderNum) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await fetch(`http://localhost:4000/api/orders/${orderNum}`, { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const updateStatus = async (orderNum, status) => {
    const body = new URLSearchParams({ field: 'orderStatus', value: status });
    try {
      await fetch(`http://localhost:4000/api/orders/${orderNum}`, {
        method: 'PATCH',
        body,
      });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Order Management</h2>
      <button onClick={fetchOrders} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>

    <table border="1" cellPadding="6">
    <thead>
        <tr>
        <th>OrderNum</th><th>Item ID</th><th>Customer ID</th><th>Address</th><th>Date</th><th>Type</th><th>Quantity</th><th>Status</th><th>Total Price</th><th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {orders.map((o) => (
        <tr key={o.orderNum}>
            <td>{o.orderNum}</td>
            <td>{o.itemID}</td>
            <td>{o.customerID}</td>
            <td>{o.address}</td>
            <td>{o.date}</td>
            <td>{o.orderType}</td>
            <td>{o.quantity}</td>
            <td>
            <select value={o.orderStatus} onChange={(e) => updateStatus(o.orderNum, e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            </td>
            <td>{o.totalPrice}</td>
            <td>
            <button onClick={() => deleteOrder(o.orderNum)}>Delete</button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
};

export default Orders;
