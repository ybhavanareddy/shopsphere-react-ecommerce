import React from 'react'

function ProductCard({title,price}) {
  return (
    <div>
        <h3>{title}</h3>
        <p>Price: {price}</p>
        
    </div>

  )
}

export default ProductCard