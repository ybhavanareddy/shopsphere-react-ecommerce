import React from 'react'

function ProductCard({title,price,addToCart}) {
  
  return (
    <div>
        <h3>{title}</h3>
        <p>Price: {price}</p>
        <button onClick={addToCart}>Add to Cart</button>
    </div>

  )
}

export default ProductCard