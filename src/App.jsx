
import Layout from './layout/Layout'


import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/Checkout'

import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path= "/products/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
    
  )
}

export default App