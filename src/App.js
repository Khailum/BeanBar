import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Menu from './Pages/Menu';
import Orders from './Pages/Orders';
import Reservations from './Pages/Reservations';
import Promotions from './Pages/Promotions';
import UserProfile from './Pages/UserProfile';

function App() {
  return (
    <Router>
      <div>
        <h1>Bean Bar Admin Panel</h1>
        <nav>
          <Link to="/">Dashboard</Link> |{' '}
          <Link to="/menu">Menu</Link> |{' '}
          <Link to="/orders">Orders</Link> |{' '}
          <Link to="/reservations">Reservations</Link> |{' '}
          <Link to="/promotions">Promotions</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/promotions" element={<Promotions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

