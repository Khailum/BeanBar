import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Menu from './Pages/Menu';
import Orders from './Pages/Orders';
import Stock from './Pages/Stock';
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
          <Link to="/stock">Stock</Link> |{' '}
          <Link to="/reservations">Reservations</Link> |{' '}
          <Link to="/promotions">Promotions</Link> |{' '}
          <Link to="/userProfile">UserProfile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

