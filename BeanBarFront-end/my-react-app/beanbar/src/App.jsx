import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import './App.css';

// Context
import NotificationProvider from './context/NotificationContext';

// Customer Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Promo from './components/Promo';
import About from './components/About';
import Product from './components/Product';
import Cart from './components/Cart';
import Payment from './components/Payment';
import UserProfile from './components/UserProfile';
import ReservationPage from './components/ReservationPage';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import Review from './components/Review';
import CustomerReview from './components/CustomerReview';
import Index from './components/Index';

// Admin Components
import AdminNav from './admin/AdminNav';
import AdminDashboard from './admin/AdminDashboard';
import AdminMenu from './admin/AdminMenu';
import AdminOrder from './admin/AdminOrder';
import AdminDelivery from './admin/AdminDelivery';
import AdminStock from './admin/AdminStock';
import AdminReservation from './admin/AdminReservation';
import AdminPromotions from './admin/AdminPromotions';
import AdminReview from './admin/AdminReview';
import AdminUserProfile from './admin/AdminUserProfile';
import AdminFooter from './admin/AdminFooter';

// 🔐 Check if user is admin
const isAdmin = () => {
  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(sessionStorage.getItem('user')) ||
    null;
  return user && user.UserRole === 'Admin';
};

// 👤 Layout for customer pages
function CustomerLayout() {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!hideHeaderFooter && <Header />}
      <main className="main-content">
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

// 🛠 Layout for admin pages
function AdminLayout() {
  return (
    <div className="app-container">
      <AdminNav />
      <div className="content">
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
}

// 🌍 Main App
function App() {
  return (
    <NotificationProvider>
      <Routes>
        {/* Public and Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={isAdmin() ? <AdminLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="delivery" element={<AdminDelivery />} />
          <Route path="stock" element={<AdminStock />} />
          <Route path="reservations" element={<AdminReservation />} />
          <Route path="promotions" element={<AdminPromotions />} />
          <Route path="review" element={<AdminReview />} />
          <Route path="userProfile" element={<AdminUserProfile />} />
        </Route>

        {/* Customer/Public Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="promo" element={<Promo />} />
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="review" element={<Review />} />
          <Route path="customer-review" element={<CustomerReview />} />
          <Route path="tracking" element={<Index />} />
        </Route>
      </Routes>
    </NotificationProvider>
  );
}

export default App;
