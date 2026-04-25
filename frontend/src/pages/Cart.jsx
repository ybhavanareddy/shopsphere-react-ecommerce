
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {

  const {loading, cartItems, removeFromCart,increaseQuantity, decreaseQuantity} = useContext(CartContext)

  const totalPrice = cartItems.reduce((total,item) => total + item.product.price*item.quantity,0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full"></div>
      </div>
    );
  }

  return (
  <div className='p-4 sm:p-8 max-w-4xl mx-auto'>

    {cartItems.length === 0 ? (

      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-xl shadow-md p-4 gap-4'>
        <h1 className='text-2xl font-bold mb-4'>
          Your Cart is Empty
        </h1>

        <Link
          to="/products"
          className='bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition'
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
          {cartItems.map((item)=>(
            <div
              key={item.product._id}
              className='flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/70 backdrop-blur-md rounded-xl shadow-md p-4 gap-4 border border-white/40'
            >
              <div className='flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left'>
                <img 
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className='h-16 w-16 object-contain'
                />
                <div>
                  <h3 className="font-semibold mb-1">{item.product.title}</h3>
                  <div className="flex items-center gap-2">

                      <button
                        onClick={() => decreaseQuantity(item.product._id)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
                        disabled = {item.quantity === 1}
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.product._id)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
                      >
                        +
                      </button>

                  </div>
                  <p className="text-yellow-500 mb-2">
                    ⭐ {item.product.rating} 
                  </p>
                </div>
                
              </div>

              <button
                onClick={()=>removeFromCart(item.product._id)}
                className='bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition'
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className='mt-6 border-t pt-4 flex justify-between items-center font-semibold text-lg'>
          <span>Total</span>
          <span>₹ {totalPrice.toFixed(2)}</span>
        </div>

        <Link to="/checkout">
          <button className='mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold'>
            Proceed to checkout
          </button>
        </Link>
      </>
      
    )}

  </div>
)
}

export default Cart