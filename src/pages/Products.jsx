import React from 'react'
import { useEffect, useState } from 'react'

import ProductGrid from '../components/ProductGrid'
import { fetchProducts } from '../services/ProductService'

function Products() {

  const [search,setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const[loading, setLoading] = useState(true);


  useEffect(()=>{
    async function loadProducts(){
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  },[]);




  const filteredProducts = products.filter((product)=> 
  product.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {loading ? (
          <div className="flex justify-center items-center h-screen">
            <h1 className="text-xl font-semibold">
                Loading products...
            </h1>
          </div>
      ) : (
          <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>
        Products
      </h1>

      <input 
        type ="text"
        placeholder='Search products...'
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        className='border p-2 mb-6 w-full'
      />

      <ProductGrid products={filteredProducts}/>
      
    </div>
      )}
    
    </>
    
  )
}

export default Products