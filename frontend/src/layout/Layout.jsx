import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
function Layout() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout