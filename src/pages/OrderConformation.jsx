import React from 'react'
import { Link } from 'react-router-dom';
function OrderConformation() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold mb-4'>
            Order Placed Successfully 🎉
        </h1>

        <p className='text-gray-600 mb-4'>
            Thank you for shopping with ShopSphere.
        </p>

        <Link
          to="/products"
          className='bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Continue Shopping
        </Link>

    </div>
  )
}

export default OrderConformation;