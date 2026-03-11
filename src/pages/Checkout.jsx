import { useContext } from "react";
import { CartContext } from "../context/CartContext";



function Checkout() {
    const {cartItems} = useContext(CartContext);

    const totalPrice = cartItems.reduce((total,item) => total+item.price,0);

  return (
    <div className="p-8 mx-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
            Checkout
        </h1>
        <div className="space-y-4">
            {cartItems.map((item,index)=>(
                <div key={index} className="flex justify-between">
                    <span>{item.title}</span>
                    <span>${item.price}</span>
                </div>
            ))}
        </div>

        <div className="mt-6 border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>{totalPrice}</span>
        </div>

        <button className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Place Order</button>
    </div>
  )
}

export default Checkout