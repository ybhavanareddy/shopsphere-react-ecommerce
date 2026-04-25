import express from 'express';
import { addToCart, 
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
 } from '../controllers/cartController.js';

import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

//POST add to cart -> api/cart/add 

router.post("/",protect,addToCart);

//GET get user cart -> api/cart/

router.get("/",protect,getCart);

//PATCH update cart item quantity -> api/cart/update/:productId
router.patch("/:productId",protect,updateCartItem);

//DELETE clear cart -> api/cart/clear
router.delete("/clear",protect,clearCart);

//DELETE remove item from cart -> api/cart/remove/:productId
router.delete("/:productId",protect,removeCartItem);


export default router;