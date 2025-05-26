import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Home from './components/Home';
import Promo from './components/Promo';
import About from './components/About';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import Confirmation from './components/Confirmation';
import UserProfile from './components/UserProfile';
// import Menu from './components/Menu';
import Review from './components/Review';
import Cart from './components/Cart'
import Payment from './components/Payment'

function LayoutWrapper() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

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

          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/confrimation" element={<Confirmation />} /> */}
             {/* <Route path="/menu" element={<Menu />} /> */}
               <Route path="/review" element={<Review />} />

        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;
