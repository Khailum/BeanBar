import { useEffect, useState } from 'react';

const Reservations = () => {
const [reservations, setReservations] = useState([]);
const [form, setForm] = useState({
    reservationDate: '',
    reservationTime: '',
    partySize: '',
    customerID: '',
    customerName: '',
    occasion: '',
    notes: ''
});
const [loading, setLoading] = useState(false);

const fetchReservations = async () => {
    setLoading(true);
    try {
    const res = await fetch('http://localhost:4000/api/reservations');
    const text = await res.text();
    const rows = text.trim().split('\n');
    const data = rows.map(row => {
        const [tableNum, reservationDate, reservationTime, partySize, customerID, customerName, tableStatus, occasion, notes] = row.split(',');
        return { tableNum, reservationDate, reservationTime, partySize, customerID, customerName, tableStatus, occasion, notes };
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

const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
};

const addReservation = async () => {
    const { reservationDate, reservationTime, partySize, customerID, customerName, occasion, notes } = form;
    if (!reservationDate || !reservationTime || !partySize || !customerID || !customerName) {
    return alert('Please fill all required fields');
    }

    const body = new URLSearchParams({ reservationDate, reservationTime, partySize, customerID, customerName, occasion, notes });

    try {
    const res = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        body,
    });
    if (!res.ok) throw new Error('Failed to add reservation');
    setForm({ reservationDate: '', reservationTime: '', partySize: '', customerID: '', customerName: '', occasion: '', notes: '' });
    fetchReservations();
    } catch (err) {
    alert('Error: ' + err.message);
    }
};

const deleteReservation = async (tableNum) => {
if (!window.confirm('Delete this reservation?')) return;
try {
    await fetch(`http://localhost:4000/api/reservations/${tableNum}`, { method: 'DELETE' });
    fetchReservations();
} catch (err) {
    alert('Failed to delete: ' + err.message);
}
};

const updateStatus = async (tableNum, status) => {
const body = new URLSearchParams({ field: 'tableStatus', value: status });
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

return (
<div>
    <h2>Reservation Management</h2>
    <button onClick={fetchReservations} disabled={loading}>
    {loading ? 'Loading...' : 'Refresh'}
    </button>

    <div>
    <h3>Add New Reservation</h3>
    <input name="reservationDate" type="date" placeholder="Date" value={form.reservationDate} onChange={handleChange} />
    <input name="reservationTime" type="time" placeholder="Time" value={form.reservationTime} onChange={handleChange} />
    <input name="partySize" type="number" placeholder="Party Size" value={form.partySize} onChange={handleChange} />
    <input name="customerID" placeholder="Customer ID" value={form.customerID} onChange={handleChange} />
    <input name="customerName" placeholder="Customer Name" value={form.customerName} onChange={handleChange} />
    <input name="occasion" placeholder="Occasion" value={form.occasion} onChange={handleChange} />
    <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
    <button onClick={addReservation}>Add Reservation</button>
    </div>

    <table border="1" cellPadding="6">
    <thead>
        <tr>
        <th>TableNum</th><th>Date</th><th>Time</th><th>Party Size</th><th>Customer ID</th><th>Name</th><th>Status</th><th>Occasion</th><th>Notes</th><th>Actions</th>
        </tr>
        </thead>
    <tbody>
        {reservations.map((r) => (
        <tr key={r.tableNum}>
            <td>{r.tableNum}</td>
            <td>{r.reservationDate}</td>
            <td>{r.reservationTime}</td>
            <td>{r.partySize}</td>
            <td>{r.customerID}</td>
            <td>{r.customerName}</td>
            <td>
                <select value={r.tableStatus} onChange={(e) => updateStatus(r.tableNum, e.target.value)}>
                <option value="Booked">Booked</option>
                <option value="Seated">Seated</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            </td>
            <td>{r.occasion}</td>
            <td>{r.notes}</td>
            <td>
            <button onClick={() => deleteReservation(r.tableNum)}>Delete</button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
};

export default Reservations;