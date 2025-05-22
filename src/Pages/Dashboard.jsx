import { useEffect, useState } from 'react';

const Dashboard = () => {
const [time, setTime] = useState(new Date());

useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
}, []);

return (
    <div>
    <h2>Dashboard</h2>
    <p>Welcome to Bean Bar's admin dashboard.</p>
    <p>Current Time: {time.toLocaleTimeString()}</p>
    <button onClick={() => alert('System stats refreshed')}>Refresh Stats</button>
    </div>
);
};

export default Dashboard;