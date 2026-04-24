import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';

import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

//POST add to cart -> api/cart/add 

router.post("/",protect,addToCart);

//GET get user cart -> api/cart/

router.get("/",protect,getCart);

export default router;