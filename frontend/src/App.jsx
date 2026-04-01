
import Layout from './layout/Layout'


import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import OrderConformation from './pages/OrderConformation'


import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    
    
    <Routes>
      <Route path="/login" element={<Login />} />
        
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Layout/>
            </ProtectedRoute>
          }
        >
        <Route 
          path="/" 
          element={<Home />} />

        <Route 
        path="/products" 
        element={ <Products /> } />

        <Route 
        path= "/products/:id" 
        element={<ProductDetails/>}/>

        <Route 
          path="/cart" 
          element={<Cart />} />

        <Route 
          path="/checkout" 
          element={<Checkout/>}/>

        <Route 
          path="/order-conformation" 
          element={<OrderConformation/>}/>


        </Route>
    </Routes>
   
    
  )
}

export default App