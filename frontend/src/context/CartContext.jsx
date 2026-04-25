import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchCart, addToCartAPI,updateCartAPI,removeFromCartAPI, clearCartAPI } from "../services/cartService";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();


function CartProvider({children}){
    
    const [cartItems,setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const {token} = useContext(AuthContext);

    async function loadCart(){
        try{
            
            const data = await fetchCart();
            setCartItems(data.items || []);
        }
        catch(error){
            console.error("Error fetching cart:", error);
        }
    }

    useEffect(() => {
        async function initCart() {
            if (!token) {
            setCartItems([]); 
            return;
            }
            setLoading(true);   
            await loadCart();
            setLoading(false);  
        }

        initCart();
    }, [token]);

    async function addToCart(product) {
    try {
        await addToCartAPI(product._id);
        await loadCart();
        toast.success("Product added to cart");
        console.log("API CALL",product._id)
        console.log("ADD TO CART CALLED");
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

   

    

    async function clearCart() {
        try {
            setLoading(true);
             
            setCartItems([]);
            await clearCartAPI();
        
            await loadCart();     
            

            toast.info("Cart cleared");

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function removeFromCart(id) {
        await removeFromCartAPI(id);
        await loadCart();
        toast.error("Product removed from cart");
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