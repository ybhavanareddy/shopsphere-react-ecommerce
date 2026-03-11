
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

function ProductCard({id,title,price,image}) {

  const { addToCart } = useContext(CartContext)

  function handleAdd(){
    const product = {id,title,price}
    addToCart(product)
  }

  return (
    <div className='border rounded-lg p-4 shadow hover:shadow-lg transition'>
        <img 
        src={image}
        alt={title}
        className = "h-40 mx-auto object-contain mb-4"
        />
        <h3 className='text-lg font-semibold mb-2'>
          <Link to={`/products/${id}`}>
          {title}
          </Link>
        </h3>

        <p className='text-gray-600 mb-b'>
          Price: {price}
        </p>

        <button 
        onClick={handleAdd}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Add to Cart
        </button>
    </div>

  )
}

export default ProductCard