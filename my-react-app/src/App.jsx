import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Promo from './components/Promo';
import About from './components/About';
import Product from './components/Product'
import Login from  './components/Login';
import Register from './components/Register';

import './App.css';

function App() {
  return (



  
    <BrowserRouter>
      <Header /> {/* Always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
         <Route path="/login" element={<Login />} /> 
         <Route path="/register" element={<Register />} />  

      </Routes>
    </BrowserRouter>
  );
}

export default App;
