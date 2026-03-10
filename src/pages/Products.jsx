import React from 'react'
import { useState } from 'react'

import ProductCard from '../components/ProductCard'
import { products } from '../services/ProductService'

function Products() {
  const [search,setSearch] = useState("");

  const filteredProducts = products.filter((product)=> 
  product.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1>Products</h1>
      <input 
        type ="text"
        placeholder='Search products...'
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />
      {filteredProducts.map(product => (
        <ProductCard 
          id={product.id}
          key={product.id}
          title={product.title}
          price={product.price}

        />
      ) )}
    </div>
  )
}

export default Products