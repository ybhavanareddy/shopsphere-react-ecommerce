import express from 'express';
import { getProducts ,
    getProductsById, 
    createProduct,
    updateProduct
} from '../controllers/productController.js';

const router = express.Router();

// GET all products -> api/products
router.get("/", getProducts);

// GET single product -> api/products/:id
router.get("/:id", getProductsById);

//POST product 
router.post("/",createProduct)


//PUT update product
router.put("/:id",updateProduct)

export default router;