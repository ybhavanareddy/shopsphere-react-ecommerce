
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { fetchProductById } from '../services/ProductService.js';

import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton.jsx';

function ProductDetails() {

    const[product, setProduct] = useState(null);

    const {addToCart} = useContext(CartContext);

    const { id } = useParams();


    useEffect(()=>{
      async function loadProduct(){
        const data = await fetchProductById(id);
      setProduct(data);
      }
      
      loadProduct();
    },[id]);

    

    if(!product){
      return <ProductDetailsSkeleton/>
    }

  return (

  <div className="min-h-[80vh] flex items-center justify-center px-4">
    <div className='w-full max-w-4xl bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col md:flex-row gap-8'>
    <div className="flex-1 flex justify-center items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 sm:h-56 md:h-64 object-contain transition-transform duration-300 hover:scale-105"
        />
    </div>
    <div className='flex-1'>

    
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
          {product.title}
        </h1>

        <p className="text-gray-600 mb-4">
          Category: {product.category}
        </p>

        <p className="text-xl font-semibold text-gray-800">
          ₹{product.price}
        </p>
        <p className="text-yellow-500 mb-4 font-medium">
          ⭐ {product.rating}
        </p>

        <p className="mb-6">
          {product.description}
        </p>
      <div className="flex gap-4 mt-4">

          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Add to Cart
          </button>

          <Link 
            to="/products"
            className="flex-1 text-center border border-purple-500 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition flex items-center justify-center"
          >
            Go to Products
          </Link>

      </div>
    </div>
    </div>
  </div>

);
}

export default ProductDetails