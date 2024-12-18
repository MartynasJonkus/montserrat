import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Login from './Login.tsx';
import ProductManagement from './ProductManagement.tsx'; 
import ProductDetails from './ProductDetails.tsx'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductManagement />} /> {/* Product Management route */}
        <Route path="/product-details/:id" element={<ProductDetails />} /> Product Details route
      </Routes>
    </Router>
  </StrictMode>
);
