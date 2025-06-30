import { useEffect, useState } from 'react';
import './AdminReservation.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://localhost:7233/api/TableReservations');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
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

  const deleteReservation = async (TableNum) => {
    if (!window.confirm('Delete this reservation?')) return;
    setLoading(true);
    try {
      const res = await fetch(`https://localhost:7233/api/TableReservations/${TableNum}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Failed to delete: status ${res.status}`);
      await fetchReservations();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (TableNum, newStatus) => {
    let body = { tableStatus: newStatus };

    if (newStatus === 'Cancelled') {
      const reason = prompt('Please provide a reason for cancellation:');
      if (!reason) return;
      body.CancelReason = reason;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://localhost:7233/api/TableReservations/${TableNum}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Failed to update status: status ${res.status}`);
      await fetchReservations();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredReservations = filterDate
    ? reservations.filter(r => r.ReservationDate === filterDate)
    : reservations;

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Reservation Management</h2>
        <div className="filter-controls">
          <input
            id="date-filter"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            disabled={loading}
          />
          <button className="refresh-button" onClick={fetchReservations} disabled={loading}>
            {loading ? (
              <span className="loading">Loading...</span>
            ) : (
              'Refresh'
            )}
          </button>
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="no-orders">
          <p>No reservations found.</p>
          <button className="gold-button" onClick={fetchReservations}>Try Again</button>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
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
              {filteredReservations.map(r => (
                <tr key={r.TableNum}>
                  <td>{r.CustomerName}</td>
                  <td>{r.Occasion}</td>
                  <td>{r.PartySize}</td>
                  <td>{r.ReservationDate}</td>
                  <td>{r.ReservationTime}</td>
                  <td>{r.Notes}</td>
                  <td className="status-selector">
                    <span className={`status-icon ${
                      r.tableStatus === 'Seated' ? 'completed' :
                      r.tableStatus === 'Cancelled' ? 'cancelled' :
                      'pending'
                    }`}>
                      ●
                    </span>
<select
  value={r.tableStatus}
  onChange={(e) => updateStatus(r.TableNum, e.target.value)}
  className={`status-select status-${r.tableStatus?.toLowerCase() || 'pending'}`}
>
  <option value="Booked">Booked</option>
  <option value="Seated">Seated</option>
  <option value="Cancelled">Cancelled</option>
</select>
                  </td>
                  <td>{r.CancelReason || '-'}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteReservation(r.TableNum)}
                      disabled={loading}
                    >
                      🗑
                    </button>
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

export default AdminReservations;
