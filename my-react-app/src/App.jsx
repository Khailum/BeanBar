// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import CustomerReview from './components/CustomerReview';
import Header from './components/Header';
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
import Footer from './components/Footer';
import Index from './components/Index';

import NotificationProvider from './context/NotificationContext';

function LayoutWrapper() {
  const location = useLocation();

  const hideHeaderFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="app-wrapper">
      {!hideHeaderFooter && <Header />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/review" element={<Review />} />
          <Route path="/customer-review" element={<CustomerReview />} />
          <Route path="/tracking" element={<Index />} />
        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
