import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {CartContext} from '../context/CartContext'

function Navbar() {
    const {cartItems} = useContext(CartContext)
  return (
    <nav>
        <div>
            <h2>Shopsphere</h2>
        </div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/cart">Cart({cartItems.length})</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
        
    </nav>

  )
}

export default Navbar