import { useState } from 'react'
import Layout from './layout/Layout'


import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'

import { Routes, Route } from 'react-router-dom'

function App() {
  const [cartCount, setCartCount] = useState(0);

  function addToCart(){
    setCartCount(cartCount+1);
  }
  return (
   
    <Layout cartCount={cartCount}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products  addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
    
  )
}

export default App