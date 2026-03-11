
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { fetchProductById } from '../services/ProductService';

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

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
      return <h1 className='text-center mt-10'>Loading product...</h1>
    }

  return (

  <div className="p-8 max-w-3xl mx-auto">

    <img
      src={product.image}
      alt={product.title}
      className="h-60 mx-auto object-contain mb-6"
    />

    <h1 className="text-2xl font-bold mb-2">
      {product.title}
    </h1>

    <p className="text-gray-600 mb-4">
      Category: {product.category}
    </p>

    <p className="text-lg font-semibold mb-4">
      Price: ₹{product.price}
    </p>

    <p className="mb-6">
      {product.description}
    </p>

    <button
      onClick={() => addToCart(product)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>

  </div>

);
}

export default ProductDetails