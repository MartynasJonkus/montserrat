import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './main.css';

import OrderPage from './order-page.tsx'
import Payment from './payment.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                {/*order page is being used as a home page for now*/}
                <Route path="/" element={<OrderPage />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    </StrictMode>,
)
