import { createContext, useState } from "react";


export const CartContext = createContext();

function CartProvider({children}){
    const [cartCount,setCartCount] = useState(0);

    function addToCart(){
        setCartCount(cartCount+1)
    }

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;