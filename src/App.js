import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Menu from './Pages/Menu';
import Orders from './Pages/Orders';
import Delivery from './Pages/Delivery';
import Stock from './Pages/Stock';
import Reservations from './Pages/Reservations';
import Promotions from './Pages/Promotions';
import Review from './Pages/Review';
import UserProfile from './Pages/UserProfile';
import ContentLayout from './Pages/ContentLayout';
import './App.css';

function App() {
  return (
    
    <Router>
      <div>
        
        <h1>Bean Bar Admin Panel</h1>
        <nav>
          <Link to="/">Dashboard</Link> |{' '}
          <Link to="/menu">Menu</Link> |{' '}
          <Link to="/orders">Orders</Link> |{' '}
          <Link to="/delivery">Delivery</Link> |{' '}
          <Link to="/stock">Stock</Link> |{' '}
          <Link to="/reservations">Reservations</Link> |{' '}
          <Link to="/promotions">Promotions</Link> |{' '}
          <Link to="/review">Review</Link> |{' '}
          <Link to="/userProfile">UserProfile</Link>
        </nav>

        {/* Wrap your routed pages inside ContentLayout to center the page content */}
        <ContentLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/review" element={<Review />} />
            <Route path="/userProfile" element={<UserProfile />} />
          </Routes>
        </ContentLayout>
      </div>
    </Router>
  );
}

export default App;


