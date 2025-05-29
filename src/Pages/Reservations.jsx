import { useEffect, useState } from 'react';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/reservations');
      const text = await res.text();
      const rows = text.trim().split('\n');
      const data = rows.map(row => {
        const [
          tableNum,
          reservationDate,
          reservationTime,
          partySize,
          customerID,
          customerName,
          tableStatus,
          occasion,
          notes,
          cancelReason
        ] = row.split(',');
        return { tableNum, reservationDate, reservationTime, partySize, customerID, customerName, tableStatus, occasion, notes, cancelReason };
      });
      setReservations(data);
    } catch (err) {
      alert('Failed to load reservations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const deleteReservation = async (tableNum) => {
    if (!window.confirm('Delete this reservation?')) return;
    try {
      await fetch(`http://localhost:4000/api/reservations/${tableNum}`, { method: 'DELETE' });
      fetchReservations();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const updateStatus = async (tableNum, newStatus) => {
    let reason = '';
    if (newStatus === 'Cancelled') {
      reason = prompt('Please provide a reason for cancellation:');
      if (!reason) return;
    }

    const body = new URLSearchParams({
      field: 'tableStatus',
      value: newStatus,
      reason: reason
    });

    try {
      await fetch(`http://localhost:4000/api/reservations/${tableNum}`, {
        method: 'PATCH',
        body,
      });
      fetchReservations();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const filteredReservations = filterDate
    ? reservations.filter(r => r.reservationDate === filterDate)
    : reservations;

  return (
    <div>
      <h2>Reservation Management</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Filter by Date: </label>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        <button onClick={fetchReservations} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <table border="1" cellPadding="6" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Occasion</th>
            <th>Party Size</th>
            <th>Date</th>
            <th>Time</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Cancel Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>No reservations found.</td>
            </tr>
          ) : (
            filteredReservations.map(r => (
              <tr key={r.tableNum}>
                <td>{r.customerID}</td>
                <td>{r.customerName}</td>
                <td>{r.occasion}</td>
                <td>{r.partySize}</td>
                <td>{r.reservationDate}</td>
                <td>{r.reservationTime}</td>
                <td>{r.notes}</td>
                <td>
                  <select
                    value={r.tableStatus}
                    onChange={(e) => updateStatus(r.tableNum, e.target.value)}
                  >
                    <option value="Booked">Booked</option>
                    <option value="Seated">Seated</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{r.cancelReason || '-'}</td>
                <td>
                  <button onClick={() => deleteReservation(r.tableNum)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
