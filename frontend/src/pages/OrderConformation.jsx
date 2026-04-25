import React from 'react'
import { Link } from 'react-router-dom';
function OrderConformation() {
  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4'>

      <div className='bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 sm:p-10 text-center max-w-md w-full'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-4'>
              Order Placed Successfully 🎉
          </h1>

          <p className='text-gray-600 mb-6'>
              Thank you for shopping with ShopSphere.
          </p>

          <Link
            to="/products"
            className='block w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold'
          >
            Continue Shopping
          </Link>

      </div>
    </div>
  )
}

export default OrderConformation;