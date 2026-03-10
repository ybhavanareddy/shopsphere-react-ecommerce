import { createContext, useState } from "react";


export const CartContext = createContext();

function CartProvider({children}){
    const [cartItems,setCartItems] = useState([]);

    function addToCart(product){
        setCartItems([...cartItems,product])
    }

    function removeFromCart(index){
        const updatedCart = cartItems.filter((_,i)=> i !== index);
        setCartItems(updatedCart);
    }
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;