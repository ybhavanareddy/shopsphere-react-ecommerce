import React from 'react'
import { Link } from 'react-router-dom';
function OrderConformation() {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 sm:p-8'>

      <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-4'>
              Order Placed Successfully 🎉
          </h1>

          <p className='text-gray-600 mb-6 sm:text-base'>
              Thank you for shopping with ShopSphere.
          </p>

          <Link
            to="/products"
            className='bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          >
            Continue Shopping
          </Link>

      </div>
    </div>
  )
}

export default OrderConformation;