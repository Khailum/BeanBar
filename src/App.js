import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Menu from './Pages/Menu';
import Orders from './Pages/Orders';
import Delivery from './Pages/Delivery';
import Stock from './Pages/Stock';
import Reservations from './Pages/Reservations';
import Promotions from './Pages/Promotions';
import Review from './Pages/Review';
import UserProfile from './Pages/UserProfile';
import './App.css';
import AdminNav from './AdminNav';


function App() {
  return (
    
    <Router>
      
        
     <AdminNav />

        {/* Wrap your routed pages inside ContentLayout to center the page content */}
        
          
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
        
      
    </Router>
  );
}

export default App;


