import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './main.css';

import OrderPage from './order-page.tsx'
import Payment from './payment.tsx';
import Dashboard from './dashboard.tsx';
import OrderManagement from './order-management.tsx';
import ReservationManagement from './reservation-management.tsx';
import ReservationPage from './reservation-page.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                {/*Dashboard is being used as the home page for now, should be replaced to login*/}
                <Route path="/" element={<Dashboard /> } />
                <Route path="/ordercreation" element={<OrderPage />} />
                <Route path="/reservationcreation" element={<ReservationPage />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/ordermanagement" element={<OrderManagement />} />
                <Route path="/reservationmanagement" element={<ReservationManagement />} />
            </Routes>
        </Router>
    </StrictMode>,
)
