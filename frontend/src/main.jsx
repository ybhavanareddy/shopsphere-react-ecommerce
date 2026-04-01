
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from 'react-router-dom'
import CartProvider from './context/CartContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
        <ToastContainer position="top-right" autoClose={1000} />
      </CartProvider>
    </AuthProvider>
    
  </BrowserRouter>,
)
