import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import OrderPage from './order-page.tsx'
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <OrderPage />
  </StrictMode>,
)
