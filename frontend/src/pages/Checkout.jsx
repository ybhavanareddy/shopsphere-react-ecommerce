import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function Checkout() {
    const navigate = useNavigate();
    const {cartItems, clearCart, loading} = useContext(CartContext);

    const totalPrice = cartItems.reduce((total,item) => total+item.product.price*item.quantity,0);

    async function handlePlaceOrder() {
    await clearCart();          
    navigate("/order-confirm"); 
    }

    if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
            <h1 className="text-xl font-semibold mb-4">
                No items to checkout
            </h1>
            </div>
        );
    }

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="p-4  sm:p-8  mx-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Checkout
            </h1>
            <div className="space-y-4">
                {cartItems.map((item,index)=>(
                    <div key={index} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="font-medium">{item.product.title}</span>
                        <span className="text-gray-600">${item.product.price}*{item.quantity}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)}</span>
            </div>

            <button 
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition">Place Order</button>
        </div>
    </div>
  )
}

export default Checkout