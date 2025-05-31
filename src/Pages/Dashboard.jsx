import { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>
      <p className="dashboard-welcome">Welcome to Bean Bar's admin dashboard.</p>
      <p className="dashboard-time">Current Time: <span>{time.toLocaleTimeString()}</span></p>
      <button className="btnn" onClick={() => alert('System stats refreshed')}>
        Refresh Stats
      </button>
    </div>
  );
};

export default Dashboard;
