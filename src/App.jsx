
import Layout from './layout/Layout'


import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'

import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    
    <Layout>
      <h1 className='text-3xl font-bold text-blue-500'>ShopShepre</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path= "/products/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
    
  )
}

export default App