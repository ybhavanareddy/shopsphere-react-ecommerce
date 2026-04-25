
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

function ProductCard({product}) {

  const { addToCart } = useContext(CartContext)

  function handleAdd(){
    addToCart(product)
  }

  return (
    <div className='bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between h-full'>
        <img 
        src={product.thumbnail}
        alt={product.title}
        className = "h-32 sm:h-36 md:h-40 mx-auto object-contain mb-4 transition-transform duration-300 hover:scale-105"
        />
        <h3 className='text-sm sm:text-base md:text-lg font-semibold mb-2 line-clamp-2'>
          
          {product.title}
          
        </h3>

        <p className='font-semibold text-gray-800 mb-1'>
          ₹{product.price}
        </p>
        <p className="text-yellow-500 text-sm mb-3 font-medium">
          ⭐ {product.rating}
        </p>
        
        <div className="flex gap-2 mt-auto">
        
          <button 
            onClick={handleAdd}
            className='w-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-lg hover:opacity-90 transition'
          >
            Add to Cart
          </button>

          
          <Link
            to={`/products/${product._id}`}
            className="w-1/2 text-center border border-purple-500 text-purple-600 hover:bg-purple-50 px-2 py-2 rounded transition"
          >
            View Details
          </Link>

        
        </div>

    </div>

  )
}

export default ProductCard