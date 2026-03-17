
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { fetchProductById } from '../services/ProductService.js';

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';

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

  <div className="p-8 max-w-3xl mx-auto flex flex-col">

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
      className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 w-40"
    >
      Add to Cart
    </button>

    <Link 
        to="/products"
        className="bg-blue-900 text-white text-center px-4 py-2 rounded hover:bg-blue-600 mb-4 w-40"
        >
          Go to Products
    </Link>

  </div>

);
}

export default ProductDetails