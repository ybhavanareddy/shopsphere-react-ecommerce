import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
function ProductCard({title,price}) {
  const { addToCart } = useContext(CartContext)
  return (
    <div>
        <h3>{title}</h3>
        <p>Price: {price}</p>
        <button onClick={addToCart}>Add to Cart</button>
    </div>

  )
}

export default ProductCard