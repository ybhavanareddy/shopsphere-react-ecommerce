import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'


function Cart() {
  const {cartItems, removeFromCart} = useContext(CartContext)

  return (
    <div>
      <h1>Cart Items</h1>
      {cartItems.map((item,index)=>(
        <div key={index}>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <button onClick={()=>removeFromCart(index)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default Cart