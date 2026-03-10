import React from 'react'
import { Link } from 'react-router-dom'
function Navbar({cartCount}) {
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
                <Link to="/cart">Cart({cartCount})</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
        
    </nav>

  )
}

export default Navbar