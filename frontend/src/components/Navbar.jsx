import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import {CartContext} from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const {cartItems} = useContext(CartContext);
    const {isLoggedIn, logout} = useContext(AuthContext);

    function handleLogout(){
        logout();
        navigate("/login");
    }

  return (
    <nav className='bg-blue-900 text-white px-4 sm:px-6 py-4 flex justify-between items-center'>
        
        <h2 className='text-xl font-bold'>Shopsphere</h2>
        <button
            className='md:hidden text-2xl'
            onClick={()=>setMenuOpen(!menuOpen)}
        >
            ☰
        </button>
        
        <ul className= {`
            absolute md:static 
            top-16 left-0 w-full md:w-auto
            bg-blue-900 md:bg-transparent
            flex flex-col md:flex-row 
            items-center gap-4 md:gap-6
            py-4 md:py-0
            transition-all duration-300
            ${menuOpen ? "block" : "hidden"} md:flex
        `}>
            <li>
                <Link to="/" onClick={()=>setMenuOpen(false)}>Home</Link>
            </li>
            <li>
                <Link to="/products" onClick={()=>setMenuOpen(false)}>Products</Link>
            </li>
            <li>
                <Link to="/cart" onClick={()=>setMenuOpen(false)}>Cart({cartItems.length})</Link>
            </li>
            {isLoggedIn ? (
                <li>
                    <button onClick={()=>{
                        handleLogout();
                        setMenuOpen(false)
                    }}>Logout</button>
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