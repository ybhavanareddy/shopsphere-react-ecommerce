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

//Update cart item quantity 
export const updateCartItem = async(req,res)=>{
    try{
        const userId = req.user.id;
        const {productId} = req.params;
        const {quantity} = req.body;

        const cart = await Cart.findOne({user:userId});

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if(!item){
            return res.status(404).json({message:"Item not found in cart"});
        }

        item.quantity = quantity;

        await cart.save();

        res.json({message:"Cart item updated",cart});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {

    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed from cart", cart });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Clear cart (after order placement)
export const clearCart = async (req, res) => {
  try {
    const userId = req.user;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.json({ message: "Cart already empty" });
    }

    cart.items = []; // remove all items
    await cart.save();

    res.json({ message: "Cart cleared", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};