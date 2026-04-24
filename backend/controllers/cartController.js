import Cart from '../models/Cart.js';

//Add item to cart 

export const addToCart = async(req,res)=>{
    try{
        const userId = req.user.id; //from jwt middleware(authMiddleware)
        const {productId} = req.body;

        let cart = await Cart.findOne({user:userId});

        //If cart doesn't exist, create new cart
        if(!cart){
            cart = new Cart({
                user:userId,
                items:[{product:productId,quantity:1}]
            });
           
        } else{
                const itemIndex = cart.items.findIndex(
                (item)=> item.product.toString() === productId
                );

                if(itemIndex > -1){
                    //If product already exists in cart, increase quantity
                    cart.items[itemIndex].quantity += 1;
                }else{
                    //new product, add to cart
                    cart.items.push({product:productId,quantity:1});
                }
            }
            await cart.save();
            res.json({message:"Product added to cart",cart});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

//Get user cart

export const getCart = async(req,res)=>{
    try{
        const userId = req.user.id; //from jwt middleware(authMiddleware)

        const cart = await Cart.findOne({user:userId}).populate("items.product");

        if(!cart){
            return res.json({items:[]});
        }
        res.json(cart);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}