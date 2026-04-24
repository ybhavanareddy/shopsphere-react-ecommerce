
import Layout from './layout/Layout'


import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import OrderConformation from './pages/OrderConformation'


import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    
    
     <Routes>

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout (NO protection here) */}
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path="products" element={<Products />} />

        <Route path="products/:id" element={<ProductDetails />} />

        {/* Protected routes */}
        <Route 
          path="cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="order-conformation" 
          element={
            <ProtectedRoute>
              <OrderConformation />
            </ProtectedRoute>
          } 
        />

      </Route>

    </Routes>
   
    
  )
}

export default App