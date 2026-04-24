
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

function ProductCard({product}) {

  const { addToCart } = useContext(CartContext)

  function handleAdd(){
    addToCart(product)
  }

  return (
    <div className='border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between h-full'>
        <img 
        src={product.thumbnail}
        alt={product.title}
        className = "h-32 sm:h-36 md:h-40 mx-auto object-contain mb-4"
        />
        <h3 className='text-sm sm:text-base md:text-lg font-semibold mb-2 line-clamp-2'>
          
          {product.title}
          
        </h3>

        <p className='text-gray-600 text-sm sm:text-base mb-1'>
          Price: ₹{product.price}
        </p>
        <p className="text-yellow-500 text-sm mb-2">
          ⭐ {product.rating}
        </p>
        
        <div className="flex gap-2 mt-auto">
        
          <button 
            onClick={handleAdd}
            className='w-1/2 bg-blue-900 text-white px-2 py-2 rounded hover:bg-blue-600 transition'
          >
            Add to Cart
          </button>

          
          <Link
            to={`/products/${product._id}`}
            className="w-1/2 text-center border border-blue-900 text-blue-900 px-2 py-2 rounded hover:bg-blue-100 transition"
          >
            View Details
          </Link>

        
        </div>

    </div>

  )
}

export default ProductCard