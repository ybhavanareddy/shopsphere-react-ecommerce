import React from 'react'
import ProductCard from '../components/ProductCard'
function Products() {
  const products = [
    {id:1, title:"Laptop",price:50000},
    {id:2, title:"Phone",price:20000},
    {id:3, title:"Head Phones",price:5000},
    {id:4, title:"SmartWatch",price:5000},
    {id:5, title:"Tv",price:55000}
  ]
    
  
  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
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