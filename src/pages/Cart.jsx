import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'


function Cart() {

  const {cartItems, removeFromCart} = useContext(CartContext)

  const totalPrice = cartItems.reduce((total,item) => total + item.price,0);

  return (
    <div className='p-8 max-w-3xl mx-auto'>

      <h1 className='text-2xl font-bold mb-6'>
        Cart Items
      </h1>

      <div className='space-y-4'>
          {cartItems.map((item,index)=>(

                <div 
            key={index}
            className='flex justify-between items-center border p-4 rounded'
          >
          
              <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className='text-gray-600'>Price: ${item.price}</p>
              </div>

              <button 
            onClick={()=>removeFromCart(index)}
            className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
          >
            Remove
              </button>

                </div>
          ))}
      </div>
      
      <div className='mt-6 border-t pt-4 flex justify-between font-bold text-lg'>
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
      
    </div>
  )
}

export default Cart