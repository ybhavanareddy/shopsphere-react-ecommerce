import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function Checkout() {
    const navigate = useNavigate();
    const {cartItems, clearCart, loading} = useContext(CartContext);

    const totalPrice = cartItems.reduce((total,item) => total+item.product.price*item.quantity,0);

    async function handlePlaceOrder() {
    await clearCart();          
    navigate("/order-conformation"); 
    }

    if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full"></div>
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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 sm:p-8">
            
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
                    Checkout
                </h1>
                <div className="space-y-4">
                    {cartItems.map((item,index)=>(
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">{item.product.title}</span>
                            <span className="text-gray-600">₹ {item.product.price}*{item.quantity}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹ {totalPrice.toFixed(2)}</span>
                </div>

                <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 hover:scale-[1.02] transition font-semibold mt-4">Place Order</button>
           

        </div>
    
    </div>
  )
}

export default Checkout