
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {

  const {cartItems, removeFromCart} = useContext(CartContext)

  const totalPrice = cartItems.reduce((total,item) => total + item.price*item.quantity,0);

  return (
  <div className='p-8 max-w-3xl mx-auto'>

    {cartItems.length === 0 ? (

      <div className='flex flex-col items-center justify-center h-[60vh]'>
        <h1 className='text-2xl font-bold mb-4'>
          Your Cart is Empty
        </h1>

        <Link
          to="/products"
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Continue Shopping
        </Link>
      </div>

    ) : (

      <>
        <h1 className='text-2xl font-bold mb-6'>
          Cart Items
        </h1>

        <div className='space-y-4'>
          {cartItems.map((item,index)=>(
            <div
              key={index}
              className='flex justify-between items-center border p-4 rounded'
            >
              <div className='flex items-center gap-4'>
                <img 
                  src={item.image}
                  alt={item.title}
                  className='h-16 w-16 object-contain'
                />
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className='text-gray-600 mb-1'>₹{item.price} × {item.quantity}</p>
                  <p className="text-yellow-500 mb-2">
                    ⭐ {item.rating.rate} ({item.rating.count})
                  </p>
                </div>
                
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

        <Link to="/checkout">
          <button className='mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'>
            Proceed to checkout
          </button>
        </Link>
      </>
      
    )}

  </div>
)
}

export default Cart