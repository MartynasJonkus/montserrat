import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import LoginPage from './Login.tsx';
import OrderPage from './order-page.tsx';
import Payment from './payment.tsx';
import Dashboard from './dashboard.tsx';
import OrderManagement from './order-management.tsx';
import ReservationManagement from './reservation-management.tsx';
import ReservationPage from './reservation-page.tsx';
import ProductManagement from './Catalog/ProductManagement.tsx'; 
import ProductDetails from './Catalog/ProductDetails.tsx';
import ServiceManagement from './Catalog/ServiceManagement.tsx';
import EmployeeManagement from './Catalog/EmployeeManagement.tsx';
import DiscountManagement from './Catalog/DiscountManagement.tsx';
import GiftCardManagement from './Catalog/GiftCardManagement.tsx';
import TaxManagement from './Catalog/TaxManagement.tsx';
import CustomerManagement from './Catalog/CustomerManagement.tsx';
import MerchantManagement from './Catalog/MerchantManagement.tsx';
import EditProduct from './Catalog/EditProduct.tsx';
import ServiceDetails from './Catalog/ServiceDetails.tsx';
import EditService from './Catalog/EditService.tsx';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ordercreation" element={<OrderPage />} />
                <Route path="/reservationcreation" element={<ReservationPage />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/ordermanagement" element={<OrderManagement />} />
                <Route path="/reservationmanagement" element={<ReservationManagement />} />

                <Route path="/productmanagement" element={<ProductManagement />} />
                <Route path="/product-details/:productId" element={<ProductDetails />} />
                <Route path="/edit-product/:productId" element={<EditProduct />} />

                <Route path="/servicemanagement" element={<ServiceManagement /> } />
                <Route path="/service-details/:serviceId" element={<ServiceDetails /> } />
                <Route path="/edit-service/:serviceId" element={<EditService /> } />

                <Route path="/taxmanagement" element={<TaxManagement /> } />

                <Route path="/employeemanagement" element={<EmployeeManagement /> } />
                <Route path="/discountmanagement" element={<DiscountManagement /> } />
                <Route path="/giftcardmanagement" element={<GiftCardManagement /> } />
                <Route path="/customermanagement" element={<CustomerManagement /> } />
                <Route path="/merchantmanagement" element={<MerchantManagement /> } />
            </Routes>
        </Router>
    </StrictMode>,
);
