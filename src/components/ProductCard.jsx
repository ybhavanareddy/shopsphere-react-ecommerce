import React from 'react'
import { useContext } from 'react'

import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

function ProductCard({id,title,price}) {
  const { addToCart } = useContext(CartContext)

  function handleAdd(){
    const product = {id,title,price}
    addToCart(product)
  }
  return (
    <div>

        <h3><Link to={`/products/${id}`}>{title}</Link></h3>
        <p>Price: {price}</p>
        <button onClick={handleAdd}>Add to Cart</button>
    </div>

  )
}

export default ProductCard