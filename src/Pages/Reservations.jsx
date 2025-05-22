const Reservations = () => (
    <div>
    <h2>Reservations</h2>
    <p>Today's reservations:</p>
    <ul>
    <li>10:00 AM - John Smith</li>
    <li>12:30 PM - Jane Doe</li>
    </ul>
<button onClick={() => alert('Reservations updated')}>Refresh</button>
    </div>
);

export default Reservations;