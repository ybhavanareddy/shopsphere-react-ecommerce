import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchCart, addToCartAPI,updateCartAPI,removeFromCartAPI, clearCartAPI } from "../services/cartService";

export const CartContext = createContext();


function CartProvider({children}){
    
    const [cartItems,setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    
    async function loadCart(){
        try{
            setLoading(true);
            const data = await fetchCart();
            setCartItems(data.items || []);
        }
        catch(error){
            console.error("Error fetching cart:", error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadCart();
    },[]);

    async function addToCart(product) {
    try {
        await addToCartAPI(product._id);
        await loadCart();
        toast.success("Product added to cart");
    } catch (error) {
        toast.error("Failed to add product");
    }
    }

    
    

    async function increaseQuantity(id) {
        const item = cartItems.find(i => i.product._id === id);
        if (!item) return;

        await updateCartAPI(id, item.quantity + 1);
        await loadCart();
    }

    async function decreaseQuantity(id) {
        const item = cartItems.find(i => i.product._id === id);
        if (!item) return;

        if (item.quantity === 1) {
            await removeFromCartAPI(id);
        } else {
            await updateCartAPI(id, item.quantity - 1);
        }

        await loadCart();
    }

   async function removeFromCart(id) {
        await removeFromCartAPI(id);
        await loadCart();
        toast.error("Product removed from cart");
    }

    async function clearCart() {
    try {
        setLoading(true);
        await clearCartAPI();
        setCartItems([]);
        toast.info("Cart cleared");
    } finally {
        setLoading(false);
    }
    }

    
    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            loading
            }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;