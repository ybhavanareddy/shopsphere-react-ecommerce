
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

function ProductCard({id,title,price,thumbnail,rating}) {

  const { addToCart } = useContext(CartContext)

  function handleAdd(){
    const product = {id,title,price,thumbnail,rating}
    addToCart(product)
  }

  return (
    <div className='border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between h-full'>
        <img 
        src={thumbnail}
        alt={title}
        className = "h-32 sm:h-36 md:h-40 mx-auto object-contain mb-4"
        />
        <h3 className='text-sm sm:text-base md:text-lg font-semibold mb-2 line-clamp-2'>
          <Link to={`/products/${id}`}>
          {title}
          </Link>
        </h3>

        <p className='text-gray-600 text-sm sm:text-base mb-1'>
          Price: ₹{price}
        </p>
        <p className="text-yellow-500 text-sm mb-2">
          ⭐ {rating}
        </p>
        <button 
        onClick={handleAdd}
        className='mt-auto bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Add to Cart
        </button>
    </div>

  )
}

export default ProductCard