import { useEffect, useState } from 'react';

const Reservations = () => {
const [reservations, setReservations] = useState([]);
const [form, setForm] = useState({ name: '', contact: '', time: '', guests: '' });
const [loading, setLoading] = useState(false);

const fetchReservations = async () => {
    setLoading(true);
    try {
    const res = await fetch('http://localhost:4000/api/reservations');
    const text = await res.text();
    const rows = text.trim().split('\n');
    const data = rows.map(row => {
        const [id, name, contact, time, guests] = row.split(',');
        return { id, name, contact, time, guests };
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
    const { name, contact, time, guests } = form;
    if (!name || !contact || !time || !guests) return alert('Please fill all fields');

    const body = new URLSearchParams({ name, contact, time, guests });

    try {
    const res = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        body,
    });
    if (!res.ok) throw new Error('Failed to add reservation');
    setForm({ name: '', contact: '', time: '', guests: '' });
    fetchReservations();
    } catch (err) {
    alert('Error: ' + err.message);
    }
};

const deleteReservation = async (id) => {
    if (!window.confirm('Delete this reservation?')) return;
    try {
    await fetch(`http://localhost:4000/api/reservations/${id}`, { method: 'DELETE' });
    fetchReservations();
    } catch (err) {
    alert('Failed to delete: ' + err.message);
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
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
        <input name="time" type="datetime-local" value={form.time} onChange={handleChange} />
        <input name="guests" type="number" placeholder="Guests" value={form.guests} onChange={handleChange} />
        <button onClick={addReservation}>Add Reservation</button>
    </div>

    <table border="1" cellPadding="6">
        <thead>
        <tr>
            <th>ID</th><th>Name</th><th>Contact</th><th>Time</th><th>Guests</th><th>Note</th><th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {reservations.map((r) => (
            <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.name}</td>
            <td>{r.contact}</td>
            <td>{new Date(r.time).toLocaleString()}</td>
            <td>{r.guests}</td>
            <td>{r.note}</td>
            <td>
                <button onClick={() => deleteReservation(r.id)}>Delete</button>
            </td>
            <td>
            <select
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value)}
                >
                <option value="Booked">Booked</option>
                <option value="Seated">Seated</option>
                <option value="Cancelled">Cancelled</option>
                </select>
            </td>
            <td>
                <button onClick={() => deleteReservation(r.id)}>Delete</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default Reservations;