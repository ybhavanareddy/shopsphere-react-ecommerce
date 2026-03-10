import React from 'react'
import Navbar from '../components/Navbar'
function Layout({children,cartCount}) {
  return (
    <div>
        <Navbar cartCount={cartCount} />
        {children}
    </div>
  )
}

export default Layout