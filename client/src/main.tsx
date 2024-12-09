import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './main.css';

import LoginPage from './LoginPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login Page as default */}
      </Routes>
    </Router>
  </StrictMode>
);