import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './main.css';

import LoginPage from './Login.tsx';
import OrderPage from './order-page.tsx';
import Payment from './payment.tsx';
import Dashboard from './dashboard.tsx';
import OrderManagement from './order-management.tsx';
import ReservationManagement from './reservation-management.tsx';
import ReservationPage from './reservation-page.tsx';
import ProductManagement from './ProductManagement.tsx'; 
import ProductDetails from './ProductDetails.tsx'; // Import Product Details

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} /> {/* Login Page as default */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ordercreation" element={<OrderPage />} />
                <Route path="/reservationcreation" element={<ReservationPage />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/ordermanagement" element={<OrderManagement />} />
                <Route path="/reservationmanagement" element={<ReservationManagement />} />
                <Route path="/productmanagement" element={<ProductManagement />} /> 
                <Route path="/productdetails/:productId" element={<ProductDetails />} />
        </Router>
    </StrictMode>,
);
