import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {CartContext} from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const {cartItems} = useContext(CartContext);
    const {isLoggedIn, logout} = useContext(AuthContext);

    function handleLogout(){
        logout();
        navigate("/login");
    }

  return (
    <nav className='bg-gray-900 text-white px-8 py-4 flex justify-between items-center'>
        
        <h2 className='text-xl font-bold'>Shopsphere</h2>
        
        <ul className='flex gap-6'>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/cart">Cart({cartItems.length})</Link>
            </li>
            {isLoggedIn ? (
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
                ): (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            <li>
                
            </li>
        </ul>
        
    </nav>

  )
}

export default Navbar